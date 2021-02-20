 #!/bin/bash

echo 'Fixing PropTypes issues, for running expo start:web (for web)'
echo 'for reference: https://github.com/necolas/react-native-web/issues/1537'

IMPORTS_REACT_NATIVE_WEB=('ViewPropTypes' 'ColorPropType' 'EdgeInsetsPropType' 'PointPropType' 'requireNativeComponent')
for import in "${IMPORTS_REACT_NATIVE_WEB[@]}"
do
    echo "Fixing $import ..."
    if grep -q "export const $import = { style: null };" ./node_modules/react-native-web/dist/index.js; then
        echo "$import fixed already!"
    else
        echo "export const $import = { style: null };">> ./node_modules/react-native-web/dist/index.js
    fi
done