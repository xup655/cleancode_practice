<?php

class SMS {
	var $username;
	var $password;
	var $error;
	var $message;
	var $mobile; 
	var $dlvtime; 
	var $type;

	function SMS(){
		global $config;
		$this->username = $config->getValue('sms_username');
		$this->password = $config->getValue('sms_password');
	}

	function send($message=''){
        $username = $this->username; // 帳號
        $password = $this->password; // 密碼
        $type = $this->type;
        if (!empty($message)) $this->message = $message;

		$dlvtime = '';
		$type = 'now';
        if (!empty($this->dlvtime)) {
			$type = 'dlv';
			$dlvtime = $this->dlvtime;
		}

        $mobile = $this->mobile ;
	    $message = iconv('utf-8','big5', $this->message );
        $encoding = "big5"; // 簡訊內容編碼
        $popup = ""; // 使用 POPUP 顯示
        $mo = ""; // 使用雙向簡訊
        $vldtime = ""; // 簡訊有效期限

        $MSGData = "";
        $response = ""; 
        $msg = "username=".$username."&password=".$password."&type=".$type."&encoding=".$encoding."&popup=".$popup."&mo=".$mo."&mobile=".$mobile."&message=".$message."&vldtime=".$vldtime."&dlvtime=".$dlvtime."&response=".$response;

        $num = strlen($msg);
        // 打開 API 閘道
        $fp = fsockopen ("api.twsms.com", 80);
        if ($fp) {
	        $MSGData .= "POST /send_sms.php HTTP/1.1\r\n";
	        $MSGData .= "Host: api.twsms.com\r\n";
	        $MSGData .= "Content-Length: ".$num."\r\n";
	        $MSGData .= "Content-Type: application/x-www-form-urlencoded\r\n";
	        $MSGData .= "Connection: Close\r\n\r\n";
	        $MSGData .= $msg."\r\n";
	        fputs ($fp, $MSGData);
	        // 取出回傳值
	        while (!feof($fp)) $Tmp[]=fgets ($fp,128);
	        // 關閉閘道
	        fclose ($fp);
	        // 顯示回傳值
	        for ($i=0; $i<count($Tmp); $i++){
		        if (ereg("resp=",$Tmp[$i]) != FALSE){
		       	 $CheckRes = split("=",$Tmp[$i]);
		        }
	        }
	        if (intval($CheckRes[1]) <= 0){
	        $this->error = "傳送失敗:".$CheckRes[1];
	        } else {
	       	 $this->error = "傳送完成:".$CheckRes[1];
	        }
        } else {
        	$this->error = "您無法連接 TwSMS API Server";
        }
        if (!empty($this->error))  {
			print_r($this->error);
        	$logger = new Logger();
        	$logger->error($this->error);
        }
	}

}

