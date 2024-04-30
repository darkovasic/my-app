"use client";

import Input from "@/components/Input";
import Select from "@/components/Select";
import type { ActionFunction } from "../util/context";
import { useUserContext } from "../util/context";
import { useFormState } from "../util/hooks";
import SubmitButton from "./SubmitButton";
import { roleOptions } from "@/app/pages/admin/users/util/context";
import { toast } from "sonner";
import { useState } from "react";

function UserForm({ action }: { action: ActionFunction }) {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useUserContext();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      role,
      password,
      confirmPassword,
      description,
    };
    setIsLoading(true);
    const response = await action(data);
    setIsLoading(false);

    if (response?.isError) {
      toast.error(response.message.title, {
        description: response.message.description,
        action: {
          label: "Copy",
          onClick: () =>
            navigator.clipboard.writeText(response.message.description || ""),
        },
      });
    } else {
      toast.success(response?.message.title, {
        description: response?.message.description,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <input type="hidden" name="id" value={user.id} />
        <Input
          id={`firstName`}
          label={`First Name`}
          type={`text`}
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          defaultValue={user.firstName}
          required
        />
        <Input
          id={`lastName`}
          label={`Last Name`}
          type={`text`}
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          defaultValue={user.lastName}
          required
        />
        <Input
          id={`email`}
          label={`Email`}
          type={`email`}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          defaultValue={user.email}
          required
        />
        <Select
          id="role"
          label="Role"
          onValueChange={(value) => setRole(value)}
          value={role}
          placeholder="Select role..."
          defaultValue={user.role ?? "user"}
          options={roleOptions}
        />
        <Input
          id={`password`}
          label={`Password`}
          type={`password`}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          minLength={6}
          required
        />
        <Input
          id={`repeatPassword`}
          label={`Repeat Password`}
          type={`password`}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          minLength={6}
          required
        />
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={4}
            defaultValue={user?.description}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                      border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write user description here"
          ></textarea>
        </div>
      </div>
      <SubmitButton loading={isLoading} />
    </form>
  );
}

export default UserForm;
