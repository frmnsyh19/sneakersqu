import Loginbuttongoogle from "../components/Loginbuttongoogle";

export default function Page() {
  return (
    <div className="w-full d-flex h-dvh flex justify-center items-center">
      <div className="w-96 shadow-md flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <p className="font-bold">Sign In</p>
          <span>login dengan akun google</span>
        </div>
        <div className="w-full">
          <Loginbuttongoogle />
        </div>
      </div>
    </div>
  );
}
