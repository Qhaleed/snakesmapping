type ButtonProps = {
  name: string;
  variant: "active" | "inactive";
};

export default function Button({ name, variant }: ButtonProps) {
  switch (variant) {
    case "active":
      return (
        <button className="bg-black border-white px-3 rounded">{name}</button>
      );
    case "inactive":
      return <button className="bg-green-400 px-3 rounded">{name}</button>;
  }
}
