import Text from "../Text";

export function FindYourPasswordMsg() {
  return (
    <div className="info">
      <Text tag="h5" theme="regular">
        <p className="text-white">
          Your password is <code className="font-bold">user.token</code> value at{" "}
          <code className="font-bold">~/.botway/botway.json</code>
        </p>
      </Text>
    </div>
  );
}
