import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center  space-x-450">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  Fit<span className="text-blue-600">2</span>Work
                </span>
              </Link>

              <div className="w-10 h-10   flex items-center justify-center">
                <Image
                  src={"/iconfit.svg"}
                  width={100}
                  height={100}
                  alt="icon"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <Link href="/">Volver</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
