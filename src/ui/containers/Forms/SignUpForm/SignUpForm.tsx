import { Box } from "@/src/ui/components";
import { Button } from "@/src/ui/components/Button";

type SignUpFormProps = {
  onSubmit: () => void;
};
export function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <Box>
      <Button title="Criar conta" onPress={onSubmit} />
    </Box>
  );
}
