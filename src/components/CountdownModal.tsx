import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdSpace } from "./AdSpace";

interface CountdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
}

export const CountdownModal = ({ isOpen, onClose, targetUrl }: CountdownModalProps) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(10);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.open(targetUrl, "_blank");
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, targetUrl, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Redirecionando...</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">{countdown}</div>
            <p className="text-muted-foreground">
              Você será redirecionado para o anúncio original em {countdown} segundo{countdown !== 1 ? "s" : ""}
            </p>
          </div>

          <AdSpace className="h-48" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
