import LoginForm from "@/components/form/login-form";
import Header from "@/components/layout/public/Header";

const LoginPage = () => {
  return (
    <div className="grid min-h-screen">
      <div>
        <div>
          <Header />
        </div>

        <div className="flex flex-1 items-center justify-center min-h-screen">
          <div className="w-full max-w-md ">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
