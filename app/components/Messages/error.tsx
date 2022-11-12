import Text from "../Text";

export function ErrorMsg({ messages = [], msg = "" }) {
  return (
    <div className="error">
      <Text tag="h5" theme="regular">
        {msg}
      </Text>
      {messages && (
        <ul>
          {messages.map((item, index) => (
            <li key={index}>
              <Text tag="p" theme="small">
                {`* ${item}`}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
