import jsQR from "jsqr";
import { useCallback, useEffect, useRef, useState } from "react";

export interface QRResult {
  data: string;
  timestamp: number;
}

export interface QRScannerOptions {
  facingMode?: "user" | "environment";
  scanInterval?: number;
  maxResults?: number;
}

export interface UseQRScannerReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isScanning: boolean;
  canStartScanning: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  qrResults: QRResult[];
  error: { message: string } | null;
}

export function useQRScanner(
  options: QRScannerOptions = {},
): UseQRScannerReturn {
  const {
    facingMode = "environment",
    scanInterval = 150,
    maxResults = 3,
  } = options;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [qrResults, setQrResults] = useState<QRResult[]>([]);
  const [error, setError] = useState<{ message: string } | null>(null);

  const stopScanning = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      for (const t of streamRef.current.getTracks()) t.stop();
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  }, []);

  const startScanning = useCallback(async () => {
    setError(null);
    setQrResults([]);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      streamRef.current = stream;

      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setIsScanning(true);

      intervalRef.current = setInterval(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || video.readyState < video.HAVE_ENOUGH_DATA)
          return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code?.data) {
          setQrResults((prev) => {
            const alreadySeen = prev.some((r) => r.data === code.data);
            if (alreadySeen) return prev;
            const updated = [
              { data: code.data, timestamp: Date.now() },
              ...prev,
            ];
            return updated.slice(0, maxResults);
          });
        }
      }, scanInterval);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Camera access denied";
      setError({ message: msg });
    }
  }, [facingMode, scanInterval, maxResults]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopScanning();
  }, [stopScanning]);

  return {
    videoRef,
    canvasRef,
    isScanning,
    canStartScanning: true,
    startScanning,
    stopScanning,
    qrResults,
    error,
  };
}
