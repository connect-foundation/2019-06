#!/bin/bash

POSTFIX_MASTER=/etc/postfix/master.cf

## input domain name
read -p "도메인 이름을 입력하세요: " DOMAIN_NAME

# install postfix
apt-get install postfix
dpkg-reconfigure postfix

# set SASL of SMTP
postconf -e 'smtpd_sasl_type = dovecot'
postconf -e 'smtpd_sasl_path = private/auth'
postconf -e 'smtpd_sasl_local_domain ='
postconf -e 'smtpd_sasl_security_options = noanonymous' 
postconf -e 'broken_sasl_auth_clients = yes'
postconf -e 'smtpd_sasl_auth_enable = yes'
postconf -e 'smtpd_recipient_restrictions = permit_sasl_authenticated permit_mynetworks reject_unauth_destination'

# install letsencrypt for TLS/SSL
apt install letsencrypt
letsencrypt certonly --standalone -d mail.$DOMAIN_NAME

# set TLS
postconf -e 'smtp_tls_security_level = may'
postconf -e 'smtpd_tls_security_level = may'
postconf -e 'smtp_tls_note_starttls_offer = yes'
postconf -e 'smtpd_tls_key_file=/etc/letsencrypt/live/mail.'$DOMAIN_NAME'/privkey.pem'
postconf -e 'smtpd_tls_cert_file=/etc/letsencrypt/live/mail.'$DOMAIN_NAME'/fullchain.pem'
postconf -e 'smtpd_tls_loglevel = 1'
postconf -e 'smtpd_tls_received_header = yes'
postconf -e 'myhostname = '$DOMAIN_NAME

# set smtps, submission
sed -i '12c\\smtp      inet  n       -       y       -       -       smtpd' $POSTFIX_MASTER
sed -i '17c\\submission inet n       -       y       -       -       smtpd' $POSTFIX_MASTER
sed -i '18c\\  -o syslog_name=postfix/submission' $POSTFIX_MASTER
sed -i '19c\\  -o smtpd_tls_security_level=encrypt/' $POSTFIX_MASTER
sed -i '20c\\  -o smtpd_sasl_auth_enable=yes/' $POSTFIX_MASTER
sed -i '21c\\  -o smtpd_reject_unlisted_recipient=no/' $POSTFIX_MASTER
sed -i '22c\\  -o smtpd_client_restrictions=$mua_client_restrictions/' $POSTFIX_MASTER
sed -i '23c\\  -o smtpd_helo_restrictions=$mua_helo_restrictions/' $POSTFIX_MASTER
sed -i '24c\\  -o smtpd_sender_restrictions=$mua_sender_restrictions/' $POSTFIX_MASTER
sed -i '25c\\  -o smtpd_recipient_restrictions=/' $POSTFIX_MASTER
sed -i '26c\\  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject/' $POSTFIX_MASTER
sed -i '27c\\  -o milter_macro_daemon_name=ORIGINATING/' $POSTFIX_MASTER
sed -i '28c\\smtps     inet  n       -       y       -       -       smtpd/' $POSTFIX_MASTER
sed -i '29c\\  -o syslog_name=postfix/smtps' $POSTFIX_MASTER
sed -i '30c\\  -o smtpd_tls_wrappermode=yes/' $POSTFIX_MASTER
sed -i '31c\\  -o smtpd_sasl_auth_enable=yes/' $POSTFIX_MASTER
sed -i '32c\\  -o smtpd_reject_unlisted_recipient=no/' $POSTFIX_MASTER
sed -i '33c\\  -o smtpd_client_restrictions=$mua_client_restrictions/' $POSTFIX_MASTER
sed -i '34c\\  -o smtpd_helo_restrictions=$mua_helo_restrictions/' $POSTFIX_MASTER
sed -i '35c\\  -o smtpd_sender_restrictions=$mua_sender_restrictions/' $POSTFIX_MASTER
sed -i '36c\\  -o smtpd_recipient_restrictions=/' $POSTFIX_MASTER
sed -i '37c\\  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject/' $POSTFIX_MASTER
sed -i '38c\\  -o milter_macro_daemon_name=ORIGINATING/' $POSTFIX_MASTER

systemctl restart postfix.service
