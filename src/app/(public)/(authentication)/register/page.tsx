import RegisterForm from "@/components/form/register-form";
import Header from "@/components/layout/public/Header";

const RegisterPage = () => {
  return (
    <div className="grid min-h-screen">
      <div>
        <div>
          <Header />
        </div>

        <div className="flex flex-1 items-center justify-center min-h-screen">
          <div className="w-full max-w-md ">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
