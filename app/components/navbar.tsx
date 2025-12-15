import Button from "./button";

export default function Navbar() {
  return (
    <>
      <nav className="fixed flex w-full bg-red-900 justify-between px-10 py-5">
        <h1 className="text-xl">SnakesMapping</h1>

        <div className="flex gap-10">
          <ul className="flex gap-10">
            <li>Find</li>
            <li>Collaborate</li>
            <li>Community</li>
            <li>Resources</li>
          </ul>

          <ul className="flex gap-5">
            <li>Contact</li>

            <li>
              <Button name="Signup" variant="active"></Button>
            </li>
            <li>
              <Button name="Register" variant="inactive"></Button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
