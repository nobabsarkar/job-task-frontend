import { LoaderIcon } from "lucide-react";

const AuthLoading = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div className="w-ful h-screen flex justify-center items-center">
      <div className="flex gap-1">
        <LoaderIcon className="size-6 animate-spin" />
        {label}
      </div>
    </div>
  );
};

export default AuthLoading;
