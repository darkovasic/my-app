import Input from "@/components/Input";
import Select from "@/components/Select";
import type { ActionFunction } from "../util/context";
import { useUserContext } from "../util/context";
import { useFormState } from "../util/hooks";
import SubmitButton from "./SubmitButton";
import { roleOptions } from "@/app/pages/admin/users/util/context";

function UserForm({ action }: { action: ActionFunction }) {
  const [state, handleSubmit] = useFormState(action);
  const { user } = useUserContext();

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <input type="hidden" name="id" value={user.id} />
        <Input
          id={`firstName`}
          label={`First Name`}
          type={`text`}
          defaultValue={user.firstName}
          required
        />
        <Input
          id={`lastName`}
          label={`Last Name`}
          type={`text`}
          defaultValue={user.lastName}
          required
        />
        <Input
          id={`email`}
          label={`Email`}
          type={`email`}
          defaultValue={user.email}
          required
        />
        <Select
          id="role"
          label="Role"
          placeholder="Select role..."
          defaultValue={user.role ?? "user"}
          options={roleOptions}
        />
        <Input
          id={`password`}
          label={`Password`}
          type={`password`}
          // required
        />
        <Input
          id={`repeatPassword`}
          label={`Repeat Password`}
          type={`password`}
          // required
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
      <SubmitButton loading={state.loading} />
    </form>
  );
}

export default UserForm;
