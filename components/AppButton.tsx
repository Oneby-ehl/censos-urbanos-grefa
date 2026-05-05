import { Pressable, Text } from 'react-native';
import { ui } from '../styles/ui';

type Props = {
  title: string;
  onPress: () => void;
  primary?: boolean;
};

export default function AppButton({ title, onPress, primary }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        ui.button,
        primary && ui.buttonPrimary,
      ]}
    >
      <Text
        style={[
          ui.buttonText,
          primary && ui.buttonTextPrimary,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}