// react-native-extensions.d.ts
import 'react-native';

declare module 'react-native' {
    interface ViewProps {
        className?: string;
    }
    interface ImageProps {
        className?: string;
    }
    interface TextProps {
        className?: string;
    }
    interface TextInputProps {
        className?: string;
    }
    interface TouchableOpacityProps {
        className?: string;
    }
    interface ViewSourcePropType {
        source: any;
        alt: string;
    }
    interface TextSourcePropType {
        source: any;
        alt: string;
    }
    interface TextInputSourcePropType {
        source: any;
        alt: string;
    }
    interface TouchableOpacitySourcePropType {
        source: any;
        alt: string;
    }
}
