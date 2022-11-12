import Text from "../Text";
import styles from "./index.module.scss";

export function FindYourPasswordMsg() {
  return (
    <div className={styles.info}>
      <Text tag="h5" theme="regular">
        Your password is <code>`user.token`</code> value at{" "}
        <code>`~/.botway/botway.json`</code>
      </Text>
    </div>
  );
}
