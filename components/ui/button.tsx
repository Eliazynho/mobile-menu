import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity 
      className="bg-red-600 p-4 rounded-lg items-center justify-center active:bg-red-700"
      {...props}
    >
      <Text className="text-white font-bold text-lg">
        {title}
      </Text>
    </TouchableOpacity>
  );
}