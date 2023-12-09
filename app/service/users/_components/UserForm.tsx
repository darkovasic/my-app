import SubmitButton from "./SubmitButton";
import { useUserContext } from "../context";
import { useFormState } from "../hooks";
import type { ActionFunction } from "../context";
import Input from "@/components/Input";

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
        <div>
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            defaultValue={user.role ?? "users"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
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
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write user description here"
          ></textarea>
        </div>
      </div>
      <SubmitButton loading={state.loading} />
    </form>
  );
}

export default UserForm;
