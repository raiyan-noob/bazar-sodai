import Link from "next/link";
import AuthCard from "../../shared/AuthCard";
import SocialButtons from "../../shared/SocialButtons";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <AuthCard title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <SignUpForm />
      <SocialButtons callbackURL="/" />
      <p className="mt-4 text-center text-xs">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/pages/signin" className="font-medium text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthCard>
  );
};

export default SignUp;