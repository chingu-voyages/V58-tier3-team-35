import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { useColorModeValue } from "./ui/color-mode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";
import { toast } from "sonner";
import { countries } from "@/data/countries";
import { useForm, Controller } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

interface AddVoyagerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VoyagerFormData {
  gender: string;
  countryName: string;
  goal: string;
  goalOther?: string;
  source: string;
  sourceOther?: string;
  soloProjectTier: string;
  voyageTier: string;
  voyageRole: string;
  roleType: string;
  captchaToken: string;
}

const genderCollection = createListCollection({
  items: [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Non-binary", value: "NON-BINARY" },
    { label: "Prefer Not to Say", value: "PREFER NOT TO SAY" },
    { label: "Trans", value: "TRANS" },
  ],
});

const voyageTierCollection = createListCollection({
  items: [
    { label: "Tier 1", value: "Tier 1" },
    { label: "Tier 2", value: "Tier 2" },
    { label: "Tier 3", value: "Tier 3" },
  ],
});

const soloProjectTierCollection = createListCollection({
  items: [
    {
      label: "Tier 1 (Landing Pages)",
      value:
        "Tier 1 - HTML - Basic Javascript - Basic Algorithms (LANDING PAGES)",
    },
    {
      label: "Tier 2 (Front-End)",
      value:
        "Tier 2  - Intermediate Algorithms - Front-end Projects (FRONT-END)",
    },
    {
      label: "Tier 3 (Full-Stack)",
      value:
        "Tier 3 - Advanced Projects - Apps having both Front-end and Back-end components (FULL STACK)",
    },
  ],
});

const goalCollection = createListCollection({
  items: [
    { label: "Accelerate Learning", value: "ACCELERATE LEARNING" },
    { label: "Gain Experience", value: "GAIN EXPERIENCE" },
    {
      label: "Escape Tutorial Purgatory",
      value: "GET OUT OF TUTORIAL PURGATORY",
    },
    { label: "Network with shared goals", value: "NETWORK WITH SHARED goalS" },
    { label: "Other", value: "OTHER" },
  ],
});

const sourceCollection = createListCollection({
  items: [
    { label: "DEV", value: "DEV" },
    { label: "DEV.TO", value: "DEV.TO" },
    { label: "Flutter Explained", value: "FLUTTER EXPLAINED" },
    { label: "FreeCodeCamp Forum", value: "FREE CODE CAMP FORUM" },
    { label: "Google Search", value: "GOOGLE SEARCH" },
    { label: "LinkedIn", value: "LINKEDIN" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Personal Network", value: "PERSONAL NETWORK" },
    { label: "Scrimba", value: "SCRIMBA" },
    { label: "Twitter", value: "TWITTER" },
    { label: "The Job Hackers", value: "THE JOB HACKERS" },
    { label: "YouTube", value: "YOUTUBE" },
    { label: "Other", value: "OTHER" },
  ],
});

const voyageRoleCollection = createListCollection({
  items: [
    { label: "Data Scientist", value: "Data Scientist" },
    { label: "Product Owner", value: "Product Owner" },
    { label: "Scrum Master", value: "Scrum Master" },
    { label: "UI/UX Designer", value: "UI/UX Designer" },
  ],
});

const roleTypeCollection = createListCollection({
  items: [
    { label: "Python", value: "Python" },
    { label: "Web", value: "Web" },
  ],
});

export default function AddVoyager({ isOpen, onClose }: AddVoyagerProps) {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    setError,
    unregister,
    setValue,
    formState: { errors },
  } = useForm<VoyagerFormData>();

  const [countrySearch, setCountrySearch] = useState("");
  const triggerBorder = useColorModeValue("gray.200", "whiteAlpha.300");

  const goal = watch("goal");
  const source = watch("source");

  useEffect(() => {
    if (goal !== "OTHER") {
      unregister("goalOther");
    }
  }, [goal, unregister]);

  useEffect(() => {
    if (source !== "OTHER") {
      unregister("sourceOther");
    }
  }, [source, unregister]);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const countryCollection = createListCollection({
    items: filteredCountries.map((c) => ({ label: c, value: c })),
  });

  const mutation = useMutation({
    mutationFn: async (newVoyager: VoyagerFormData) => {
      return await api.post("new-voyager", newVoyager);
    },
    onSuccess: () => {
      toast.success("Voyager added successfully!");
      queryClient.invalidateQueries({ queryKey: ["voyagers"] });
      onClose();
      reset();
    },
    onError: (error: any) => {
      console.log(error);
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          // Assuming structure { field: message } or { fieldName: message }
          // We iterate over keys to find the field name
          Object.keys(err).forEach((key) => {
            console.log(key);
            setError(key as keyof VoyagerFormData, {
              type: "server",
              message: err[key],
            });
          });
        });
        toast.error("Please fix the errors in the form");
      } else {
        toast.error(error.message || "Failed to add voyager");
      }
    },
  });

  const onSubmit = (data: VoyagerFormData) => {
    mutation.mutate(data);
  };

  const onCaptchaChange = (token: string | null) => {
    if (token) {
      setValue("captchaToken", token, { shouldValidate: true });
    } else {
      setValue("captchaToken", "", { shouldValidate: true });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Text fontSize="2xl" fontWeight="bold" mb={1}>
        Add Voyager
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        Add a new voyager to the community.
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <Controller
            control={control}
            name="countryName"
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <LabeledSelect
                label="Country"
                value={field.value}
                onChange={field.onChange}
                collection={countryCollection}
                searchable
                searchValue={countrySearch}
                onSearchChange={setCountrySearch}
                error={errors.countryName?.message}
                disabled={mutation.isPending}
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <LabeledSelect
                label="Gender"
                value={field.value}
                onChange={field.onChange}
                collection={genderCollection}
                error={errors.gender?.message}
                disabled={mutation.isPending}
              />
            )}
          />

          <Controller
            control={control}
            name="goal"
            rules={{ required: "Goal is required" }}
            render={({ field }) => (
              <LabeledSelect
                label="Goal"
                value={field.value}
                onChange={field.onChange}
                collection={goalCollection}
                error={errors.goal?.message}
                disabled={mutation.isPending}
              />
            )}
          />

          {goal === "OTHER" && (
            <Box>
              <Text mb={2} fontWeight="medium" fontSize="sm">
                Goal Other
              </Text>
              <Input
                placeholder="Specify other goal..."
                px={4}
                py={3}
                borderRadius="md"
                borderColor={errors.goalOther ? "red.500" : triggerBorder}
                disabled={mutation.isPending}
                {...register("goalOther", {
                  required: "Goal Other is required",
                })}
              />
              {errors.goalOther && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errors.goalOther.message}
                </Text>
              )}
            </Box>
          )}

          <Controller
            control={control}
            name="source"
            rules={{ required: "Source is required" }}
            render={({ field }) => (
              <LabeledSelect
                label="Source"
                value={field.value}
                onChange={field.onChange}
                collection={sourceCollection}
                error={errors.source?.message}
                disabled={mutation.isPending}
              />
            )}
          />

          {source === "OTHER" && (
            <Box>
              <Text mb={2} fontWeight="medium" fontSize="sm">
                Source Other
              </Text>
              <Input
                placeholder="Specify other source..."
                px={4}
                py={3}
                borderRadius="md"
                borderColor={errors.sourceOther ? "red.500" : triggerBorder}
                disabled={mutation.isPending}
                {...register("sourceOther", {
                  required: "Source Other is required",
                })}
              />
              {errors.sourceOther && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errors.sourceOther.message}
                </Text>
              )}
            </Box>
          )}

          <Controller
            control={control}
            name="soloProjectTier"
            rules={{ required: "Solo Project Tier is required" }}
            render={({ field }) => (
              <LabeledSelect
                label="Solo Project Tier"
                value={field.value}
                onChange={field.onChange}
                collection={soloProjectTierCollection}
                error={errors.soloProjectTier?.message}
                disabled={mutation.isPending}
              />
            )}
          />

          <Controller
            control={control}
            name="voyageTier"
            rules={{ required: "Voyage Tier is required" }}
            render={({ field }) => (
              <LabeledSelect
                label="Voyage Tier"
                value={field.value}
                onChange={field.onChange}
                collection={voyageTierCollection}
                error={errors.voyageTier?.message}
                disabled={mutation.isPending}
              />
            )}
          />

          <Controller
            control={control}
            name="voyageRole"
            rules={{ required: "Voyage Role is required" }}
            render={({ field }) => (
              <LabeledSelect
                label="Voyage Role"
                value={field.value}
                onChange={field.onChange}
                collection={voyageRoleCollection}
                error={errors.voyageRole?.message}
                disabled={mutation.isPending}
              />
            )}
          />

          <Controller
            control={control}
            name="roleType"
            rules={{ required: "Role Type is required" }}
            render={({ field }) => (
              <LabeledSelect
                label="Role Type"
                value={field.value}
                onChange={field.onChange}
                collection={roleTypeCollection}
                error={errors.roleType?.message}
                disabled={mutation.isPending}
              />
            )}
          />

          <Box display="flex" justifyContent="center" mt={4}>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
              onChange={onCaptchaChange}
            />
          </Box>
          {errors.captchaToken && (
            <Text color="red.500" fontSize="xs" textAlign="center">
              {errors.captchaToken.message}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            loading={mutation.isPending}
            mt={4}
          >
            Add Voyager
          </Button>
        </VStack>
      </form>
    </Modal>
  );
}

const LabeledSelect = ({
  label,
  value,
  onChange,
  collection,
  searchable = false,
  onSearchChange,
  searchValue,
  error,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  collection: any;
  searchable?: boolean | undefined;
  onSearchChange?: ((v: string) => void) | undefined;
  searchValue?: string | undefined;
  error?: string | undefined;
  disabled?: boolean;
}) => {
  const triggerBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  return (
    <Box>
      <SelectRoot
        collection={collection}
        value={value ? [value] : []}
        onValueChange={(e: any) => onChange(e.value[0])}
        size="md"
        disabled={disabled}
      >
        <SelectLabel mb={2} fontWeight="medium" fontSize="sm">
          {label}
        </SelectLabel>
        <SelectTrigger
          borderColor={error ? "red.500" : triggerBorder}
          borderWidth="1px"
          borderRadius="md"
          p={2}
        >
          <SelectValueText placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent zIndex={2000} portalled={false}>
          {searchable && (
            <Box p={2} position="sticky" top={0} bg="bg" zIndex={1}>
              <Input
                placeholder="Search..."
                size="sm"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              />
            </Box>
          )}
          {collection.items.map((item: any) => (
            <SelectItem item={item} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
          {collection.items.length === 0 && (
            <Box p={2} color="gray.500" fontSize="sm">
              No results found
            </Box>
          )}
        </SelectContent>
      </SelectRoot>
      {error && (
        <Text color="red.500" fontSize="xs" mt={1}>
          {error}
        </Text>
      )}
    </Box>
  );
};
