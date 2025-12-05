import { useNavigate, useParams } from "react-router";
import { useEmailVerification } from "@/api/hooks/useEmailVerification";
import Loading from "@/components/Loading";
import { useTranslation } from "react-i18next";
import VerificationError from "@/components/VerificationError";
import EmailVerificationSuccess from "@/components/VerificationSuccess";
import { useResendVerification } from "@/api/hooks/useResendVerification";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [send, setSend] = useState(false);
  const { token } = useParams();
  const { user, activateUser } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, error, isSuccess } = useEmailVerification(token!);

  const {
    data: resendData,
    isLoading: resendLoading,
    error: resendError,
    isSuccess: resendSuccess,
  } = useResendVerification(send);

  const handleResendMail = () => setSend(true);

  if (isSuccess) {
    activateUser(user);
  }
  useEffect(() => {
    if (resendError) {
      toast.error(resendError.message);
    }

    if (resendSuccess) {
      toast.success("Please check your email for a new verification link.");
    }
  }, [resendError, resendSuccess]);

  if (isLoading) return <Loading fullscreen text={t("loading")} />;

  if (error) {
    return (
      <VerificationError
        loading={resendLoading}
        onResend={() => handleResendMail()}
      />
    );
  }
  if (isSuccess)
    return <EmailVerificationSuccess onContinue={() => navigate("/user")} />;
}
