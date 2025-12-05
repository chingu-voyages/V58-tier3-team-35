import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Logout() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/");
  }, []);
  return <Loading fullscreen text={t("loading")} />;
}
