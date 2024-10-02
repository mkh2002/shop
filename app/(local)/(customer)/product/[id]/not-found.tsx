import { Frown } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="flex w-full items-center justify-center">
      <Frown className="mr-2 size-6" />
      <h1 className="text-xl font-semibold">Product not found</h1>
    </div>
  );
}
