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
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Navegación Principal */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Fit<span className="text-blue-600">2</span>Work
              </span>
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
