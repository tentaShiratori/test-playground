import { FC } from "react";

interface Props {
	value: number;
}
export const FizzBuzz: FC<Props> = ({ value }) => {
	if (value % 15 === 0) {
		return <div>FizzBuzz</div>;
	}
	if (value % 3 === 0) {
		return <div>Fizz</div>;
	}
	if (value % 5 === 0) {
		return <div>Buzz</div>;
	}
	return <div>{value}</div>;
};
