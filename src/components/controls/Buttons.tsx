// import styles from "./styles.module.css";

type TButton = {
  title: string;
};
export default function Button({ title }: TButton) {
  return (
    <div className="relative z-50">
      <button className={`button`}>{title}</button>
    </div>
  );
}
