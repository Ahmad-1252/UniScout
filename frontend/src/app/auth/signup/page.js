import { AuthLayout } from "../../components/layout/AuthLayout";
import Signup from "../../components/authentication/signup";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join us to get started with Auth Template"
    >
      <Signup />
    </AuthLayout>
  );
}