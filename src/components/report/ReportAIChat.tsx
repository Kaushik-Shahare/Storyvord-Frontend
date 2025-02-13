"use client";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

const ReportAIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  // Use a ref for the WebSocket so it persists across renders.
  const clientRef = useRef<W3CWebSocket | null>(null);
  const { id } = useParams();
  const token = Cookies.get("accessToken");

  // Initialize the WebSocket connection only if one isn’t already connecting/open.
  const initializeWebSocket = (onOpenCallback?: () => void) => {
    if (
      clientRef.current &&
      (clientRef.current.readyState === W3CWebSocket.OPEN ||
        clientRef.current.readyState === W3CWebSocket.CONNECTING)
    ) {
      return;
    }

    const wsUrl = `wss://api-stage.storyvord.com/ws/report_chat/?token=${token}&project_id=${id}`;
    const newWsClient = new W3CWebSocket(wsUrl);
    clientRef.current = newWsClient;

    newWsClient.onopen = () => {
      console.log("WebSocket connection established");
      if (onOpenCallback) {
        onOpenCallback();
      }
    };

    newWsClient.onmessage = (messageEvent) => {
      try {
        const dataFromServer = JSON.parse(messageEvent.data as string);
        if (dataFromServer.error) {
          console.error("Server error:", dataFromServer.error);
          alert(dataFromServer.error);
          setIsLoading(false);
          return;
        }
        // Use only the AI response (ignore dataFromServer.user_message).
        if (dataFromServer.ai_response) {
          setMessages((prev) => {
            const newMessages = [...prev];
            // Replace the temporary "Loading..." message with the actual AI response.
            if (
              newMessages.length > 0 &&
              newMessages[newMessages.length - 1].role === "ai" &&
              newMessages[newMessages.length - 1].content === "Loading..."
            ) {
              newMessages[newMessages.length - 1] = {
                role: "ai",
                content: dataFromServer.ai_response,
              };
            } else {
              newMessages.push({ role: "ai", content: dataFromServer.ai_response });
            }
            return newMessages;
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setIsLoading(false);
      }
    };

    newWsClient.onerror = (errorEvent) => {
      console.error("WebSocket connection failed:", errorEvent);
      alert("WebSocket connection failed. Please try again.");
      setIsLoading(false);
    };

    newWsClient.onclose = () => {
      console.log("WebSocket connection closed");
      clientRef.current = null;
    };
  };

  // Proactively initialize the WebSocket on component mount.
  useEffect(() => {
    initializeWebSocket();

    return () => {
      if (clientRef.current && clientRef.current.readyState === W3CWebSocket.OPEN) {
        clientRef.current.close();
      }
      clientRef.current = null;
    };
  }, [token, id]);

  // Helper to wait until the WebSocket connection is open.
  const waitForSocketConnection = (socket: W3CWebSocket): Promise<void> => {
    return new Promise((resolve, reject) => {
      const maxAttempts = 20; // e.g., wait up to 2 seconds (20 * 100ms)
      let attempts = 0;
      const interval = setInterval(() => {
        if (socket.readyState === W3CWebSocket.OPEN) {
          clearInterval(interval);
          resolve();
        } else {
          attempts++;
          if (attempts >= maxAttempts) {
            clearInterval(interval);
            reject(new Error("WebSocket connection timed out"));
          }
        }
      }, 100);
    });
  };

  // Send a message to the server (waits until the socket is open).
  const sendMessage = async (message: string) => {
    // Immediately add the user's message and a temporary loading indicator for the AI.
    setMessages((prev) => [
      ...prev,
      { role: "user", content: message },
      { role: "ai", content: "Loading..." },
    ]);
    setIsLoading(true);

    // If no active WebSocket connection exists, initialize one.
    if (!clientRef.current || clientRef.current.readyState !== W3CWebSocket.OPEN) {
      initializeWebSocket();
      try {
        await waitForSocketConnection(clientRef.current!);
      } catch (error) {
        console.error("WebSocket connection timed out");
        setIsLoading(false);
        return;
      }
    }

    const outgoingMessage = JSON.stringify({ message });
    console.log("Sending message:", outgoingMessage);
    clientRef.current!.send(outgoingMessage);
  };

  // Handle form submission.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[89vh] bg-white p-2 border rounded-md">
      <h2 className=" text-center text-lg font-poppins-medium">Ask about suggestions</h2>
      <hr />
      <div className="overflow-y-auto p-4 bg-white flex-1">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <p
              className={`p-2 w-[90%] rounded-lg ${
                message.role === "user"
                  ? "bg-blue-100 text-right ml-auto rounded-tr-none"
                  : "bg-gray-200 text-left mr-auto rounded-tl-none"
              }`}
            >
              <Markdown
                components={{
                  a({ children, href }) {
                    return (
                      <a href={href} target={"_blank"}>
                        {children}
                      </a>
                    );
                  },
                }}
                remarkPlugins={[remarkGfm]}
              >
                {message.content}
              </Markdown>
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 items-center">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 h-12"
        />
        <Button type="submit" disabled={isLoading} className=" rounded-md">
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};

export default ReportAIChat;
