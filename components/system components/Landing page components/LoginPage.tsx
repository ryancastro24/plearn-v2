import UserRegistration from "./UserRegistration";
import LoginForm from "./LoginForm";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Login</h1>

      {/* Login Form */}
      <LoginForm />

      {/* Actions */}

      <div className="flex items-center justify-between">
        <UserRegistration />

        {/* forgot password */}
        <ForgotPasswordDialog />
      </div>
    </div>
  );
}
