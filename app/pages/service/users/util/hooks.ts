import { useState } from "react";
import type { FormEventHandler } from "react";
import type {
  ActionFunction,
  FormHookResult,
  SubmissionState,
} from "./context";

export function useFormState(action: ActionFunction): FormHookResult {
  const [state, setState] = useState<SubmissionState>({
    loading: false,
    error: null,
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setState({ loading: true, error: null });
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await action(formData);
    if (result?.isError) {
      setState({ loading: false, error: result });
    } else {
      form.reset();
      setState({ loading: false, error: null });
    }
  };

  return [state, handleSubmit];
}
