import React,{useState,useEffect} from 'react'
import { SafeAreaView,Alert,Text,View,StyleSheet,Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const windownWidth = Dimensions.get('window').width;
const windownHeight = Dimensions.get('window').height;

const PolicyScreen=({navigation,route})=>{
    
    return(
        <SafeAreaView>
            <ScrollView>
                <View style={{padding:20}}>
                    <Text style={styles.title}>Chính sách bảo mật người dùng của MyKitchen</Text>
                    <Text style={styles.content}>
                    + Tên{"\n"}
                    + Địa chỉ email{"\n"}
                    + Số điện thoại{"\n"}
                    Thông tin thanh toán
                    MyKitchen thu thập thông tin có liên quan đến việc sử dụng trình duyệt, ứng dụng, và các thiết bị mà bạn dùng để truy cập các dịch vụ của MyKitchen, cũng như các thông tin về cách thức bạn sử dụng và tương tác với chúng tôi hoặc các dịch vụ.</Text>
                    <Text style={styles.title}>Cập nhật đối với Chính Sách Bảo Mật của chúng tôi</Text>
                    <Text style={styles.content}>
                    Vui lòng lưu ý rằng khi công nghệ, quy định pháp luật, cũng như hoạt động kinh doanh của chúng tôi có sự chuyển hóa, MyKitchen có thể cần phải cập nhật Chính Sách Bảo Mật theo từng thời kỳ. Theo đó, MyKitchen bảo lưu quyền chỉnh sửa hoặc cập nhật Chính Sách Bảo Mật của chúng tôi, và khuyến khích bạn đọc lại thông báo này cũng như Chính Sách Bảo Mật của MyKitchen</Text>
                    <Text style={styles.title}>Các quyền của bạn đối với thông tin cá nhân</Text>
                    <Text style={styles.content}>Hỏi các thông tin chúng tôi đã có về bạn{"\n"}
                    Đề xuất các thay đổi hoặc cập nhật trong Chính Sách Bảo Mật{"\n"}
                    Yêu cầu xóa dữ liệu cá nhân{"\n"}
                    Nếu bạn không muốn tiếp tục cho phép thu thập dữ liệu cá nhân của mình, bạn có thể rút lại sự đồng ý bằng cách thông báo bằng email đến Bộ phận Bảo Vệ Dữ Liệu Cá Nhân của chúng tôi. Tuy nhiên, vui lòng lưu ý rằng, việc bạn rút lại sự đồng ý cho chúng tôi thu thập, sử dụng, hoặc xử lý dữ liệu cá nhân có thể làm gián đoạn việc sử dụng các dịch vụ của MyKitchen.</Text>
                    <Text style={styles.title}>MyKitchen sử dụng các dữ liệu cá nhân được cung cấp như thế nào?</Text>
                    <Text style={styles.content}>MyKitchen xử lý thông tin cá nhân của bạn cho một số mục đích, bao gồm nhưng không giới hạn ở:{"\n"}

                    + Để liên hệ với bạn{"\n"}
                    + Để quản lý tài khoản MyKitchen của bạn{"\n"}
                    + Để xử lý giao dịch cho bạn{"\n"}
                    + Để nâng cấp sàn giao dịch và cải thiện các dịch vụ của chúng tôi{"\n"}
                    + Để cá nhân hóa quá trình bạn sử dụng các dịch vụ của chúng tôi{"\n"}
                    + Thông báo cho bạn các cập nhật có liên quan{"\n"}
                    + Trả lời cho các câu hỏi của bạn</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    title:{
        fontSize:18,
        fontWeight:'bold',
    },
    content:{
        fontSize:16,
        padding:5,
        lineHeight:22
    }
})
export default PolicyScreen