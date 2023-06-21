import "./button.css";

type Props = { children: string; onClick?: any; type?: any };

const Button = ({ children, ...rest }: Props) => {
  return (
    <button className="button-ui" {...rest}>
      {children}
    </button>
  );
};

export default Button;
