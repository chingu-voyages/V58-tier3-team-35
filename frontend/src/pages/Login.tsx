import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  Container,
  HStack,
  Icon,
} from "@chakra-ui/react";

import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiCheckCircle,
  FiCircle,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useLogin } from "@/api/hooks/useLogin";

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate, isPending } = useLogin();

  const submit = () => {
    if (!form.email || !form.password)
      return toast.error("Email & password are required");

    mutate(form, {
      onSuccess: (data) => {
        login(data);
        navigate("/user");
      },
      onError: (e: Error) => toast.error(e.message || "Something went wrong"),
    });
  };

  const bgGradient = useColorModeValue(
    "linear(to-br, #f3f4f6, #e5e7eb)",
    "linear(to-br, #667eea, #764ba2)"
  );

  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(255, 255, 255, 0.1)"
  );

  const cardBorder = useColorModeValue(
    "rgba(0, 0, 0, 0.05)",
    "rgba(255, 255, 255, 0.2)"
  );

  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.500", "whiteAlpha.800");

  const inputBg = useColorModeValue("white", "whiteAlpha.100");
  const inputBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const inputPlaceholderColor = useColorModeValue("gray.400", "whiteAlpha.600");
  const inputFocusBorder = useColorModeValue("purple.500", "whiteAlpha.600");
  const iconColor = useColorModeValue("gray.400", "rgba(255,255,255,0.7)");

  const blob1Color = useColorModeValue("purple.300", "purple.500");
  const blob2Color = useColorModeValue("blue.300", "blue.500");

  const validColor = useColorModeValue("green.500", "green.300");
  const invalidColor = useColorModeValue("gray.400", "whiteAlpha.400");

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-10%"
        left="-10%"
        w="500px"
        h="500px"
        bg={blob1Color}
        filter="blur(100px)"
        opacity="0.4"
        borderRadius="full"
      />
      <Box
        position="absolute"
        bottom="-10%"
        right="-10%"
        w="500px"
        h="500px"
        bg={blob2Color}
        filter="blur(100px)"
        opacity="0.4"
        borderRadius="full"
      />

      <MotionContainer
        maxW="md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <MotionBox
          bg={cardBg}
          backdropFilter="blur(20px)"
          borderRadius="2xl"
          p={10}
          boxShadow="xl"
          border="1px solid"
          borderColor={cardBorder}
          textAlign="center"
        >
          <Heading
            fontSize="4xl"
            fontWeight="bold"
            mb={2}
            color={textColor}
            letterSpacing="tight"
          >
            Login
          </Heading>
          <Text color={subTextColor} mb={8} fontSize="lg">
            Login to your account
          </Text>

          <VStack gap={5}>
            <Box position="relative" w="full" pb={2}>
              <Box
                position="absolute"
                left="3"
                top="0"
                bottom="0"
                display="flex"
                alignItems="center"
                zIndex={2}
                pointerEvents="none"
              >
                <FiMail size={20} color={iconColor} />
              </Box>
              <Input
                type="email"
                placeholder="Email address"
                pl={10}
                size="lg"
                bg={inputBg}
                border="1px solid"
                borderColor={inputBorder}
                color={textColor}
                _placeholder={{ color: inputPlaceholderColor }}
                _hover={{ borderColor: "gray.400" }}
                _focus={{
                  bg: inputBg,
                  borderColor: inputFocusBorder,
                  boxShadow: "none",
                }}
                borderRadius="xl"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Box>

            <Box w={"full"}>
              <Box position="relative" w="full">
                <Box
                  position="absolute"
                  left="3"
                  top="0"
                  bottom="0"
                  display="flex"
                  alignItems="center"
                  zIndex={2}
                  pointerEvents="none"
                >
                  <FiLock size={20} color={iconColor} />
                </Box>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onFocus={() => setShowRequirements(true)}
                  onBlur={() => setShowRequirements(false)}
                  pl={10}
                  size="lg"
                  bg={inputBg}
                  border="1px solid"
                  borderColor={inputBorder}
                  color={textColor}
                  _placeholder={{ color: inputPlaceholderColor }}
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{
                    bg: inputBg,
                    borderColor: inputFocusBorder,
                    boxShadow: "none",
                  }}
                  borderRadius="xl"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </Box>
              <Flex
                fontSize={"xs"}
                justifyContent={"flex-end"}
                color={subTextColor}
                pt={2}
                cursor={"pointer"}
                onClick={() => setShowPassword(!showPassword)}
                _hover={{ color: textColor }}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </Flex>
            </Box>

            <Button
              w="full"
              size="lg"
              bgGradient="linear(to-r, pink.500, purple.500)"
              _hover={{
                bgGradient: "linear(to-r, pink.600, purple.600)",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={{ transform: "translateY(0)" }}
              borderRadius="xl"
              fontSize="md"
              fontWeight="bold"
              loading={isPending}
              onClick={submit}
              transition="all 0.2s"
            >
              Login <FiArrowRight style={{ marginLeft: "8px" }} />
            </Button>
          </VStack>

          <Text mt={8} color={subTextColor} fontSize="sm">
            Don't have an account?{" "}
            <Link to="/auth/signup">
              <Text
                as="span"
                color="pink.400"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline", color: "pink.500" }}
                cursor="pointer"
              >
                Sign up
              </Text>
            </Link>
          </Text>
        </MotionBox>
      </MotionContainer>
    </Flex>
  );
}
