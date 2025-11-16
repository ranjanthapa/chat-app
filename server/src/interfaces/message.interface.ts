
export interface IMessage extends Document {
  sender: string;     
  message: string;
  createdAt: Date;
}