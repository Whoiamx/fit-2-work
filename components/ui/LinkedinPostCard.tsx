"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Linkedin, Clock, MoreHorizontal } from "lucide-react";

interface LinkedInPostCardProps {
  avatarSrc?: string;
  fullName: string;
  jobTitle: string;
  timeAgo: string;
  postContent: string;
}

export const LinkedInPostCard = ({
  avatarSrc = "/placeholder.svg?height=40&width=40",
  fullName,
  jobTitle,
  timeAgo,
  postContent,
}: LinkedInPostCardProps) => {
  return (
    <Card className="w-full max-w-xl mx-auto shadow-2xl rounded-lg border-none ">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div
            className={cn(
              "relative rounded-full p-[2px]", // Padding for the border effect
              "border-2 border-green-500" // Green border
            )}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={avatarSrc || "/placeholder.svg"}
                alt={`Avatar de ${fullName}`}
              />
              <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900">{fullName}</span>
              <Linkedin className="w-4 h-4 text-blue-700" />
              <span className="text-gray-500 text-sm">• Tú</span>{" "}
              {/* Asumiendo que es tu propia publicación */}
            </div>
            <div className="text-sm text-gray-600">{jobTitle}</div>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>{timeAgo}</span>
            </div>
          </div>
          {/* Aquí podrías añadir el menú de tres puntos si fuera necesario */}
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </div>
        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {postContent}
        </div>
      </CardContent>
    </Card>
  );
};
