import React, { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Sidebar from "../components/SideBar";
import { deleteUser, updateUser } from "../api/user";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; user: string }[]>([
    { text: "Welcome to the global chat!", user: "system" }
  ]);
  const [totalChat, setTotalChat] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: ""
  });

  const socket: Socket = useMemo(
    () =>
      io("http://localhost:5000", {
        withCredentials: true,
        transports: ["websocket"],
        auth: { token: localStorage.getItem("token") }
      }),
    []
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });
    return () => socket.off("connect");
  }, [socket]);

  useEffect(() => {
    socket.on("new-message", (msg: { text: string; user: string }) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("new-message");
  }, [socket]);

  useEffect(() => {
    socket.on("stats", (data: { totalChat: number }) => {
      setTotalChat(data.totalChat);
    });

    return () => socket.off("stats");
  }, [socket]);

  const sendMessage = () => {
    if (!message.trim()) return;

    // show message instantly
    setMessages((prev) => [...prev, { text: message, user: "You" }]);

    // send to server
    socket.emit("message", message);

    setMessage("");
  };

  const updateProfile = () => {
    setShowModal(true);
  };

  // DELETE ACCOUNT
  const deleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    try {
      await deleteUser();
      alert("Account deleted. Logging out...");
      logout();
    } catch (error) {
      alert("Failed to delete account");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-screen flex bg-gray-100">

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-bold">Update Profile</h2>

            <input
              type="email"
              placeholder="Email"
              className="w-full border px-3 py-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border px-3 py-2 rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={async () => {
                  try {
                    await updateUser({
                      email: form.email || undefined,
                      name: form.name || undefined,
                      password: form.password || undefined
                    });

                    alert("Profile updated successfully!");
                    setShowModal(false);

                    setForm({ email: "", name: "", password: "" });
                  } catch (error) {
                    alert("Failed to update profile");
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <Sidebar
        onUpdateProfile={updateProfile}
        onDeleteAccount={deleteAccount}
        onLogout={logout}
      />

      {/* Main Chat Area */}
      <div className="h-screen w-full flex items-center justify-center p-4">
        <div className="flex flex-col w-full max-w-md bg-white rounded-xl shadow-lg h-full">

          {/* Header */}
          <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl font-bold flex justify-between">
            <span>Global Chat</span>
            <span className="text-sm opacity-80">Total Chats: {totalChat}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 rounded-xl max-w-full break-words ${
                  msg.user === "You"
                    ? "bg-green-200 text-green-800 text-right self-end"
                    : msg.user === "system"
                    ? "bg-gray-300 text-gray-800 text-center"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {msg.user !== "system" && (
                  <div className="text-xs font-semibold">{msg.user}</div>
                )}
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="px-4 py-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
