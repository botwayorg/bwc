import Text from "../Text";

export function FindYourPasswordMsg() {
  return (
    <div className="info">
      <Text tag="h5" theme="regular">
        Your password is <code>`user.token`</code> value at{" "}
        <code>`~/.botway/botway.json`</code>
      </Text>
    </div>
  );
}
