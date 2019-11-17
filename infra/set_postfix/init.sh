#!/bin/bash

POSTFIX_MASTER=/etc/postfix/master.cf

## input domain name
read -p "도메인 이름을 입력하세요: " DOMAIN_NAME

# install postfix
# apt-get install postfix
# dpkg-reconfigure postfix

# set SASL of SMTP
postconf -e 'smtpd_sasl_type = dovecot'
postconf -e 'smtpd_sasl_path = private/auth'
postconf -e 'smtpd_sasl_local_domain ='
postconf -e 'smtpd_sasl_security_options = noanonymous' 
postconf -e 'broken_sasl_auth_clients = yes'
postconf -e 'smtpd_sasl_auth_enable = yes'
postconf -e 'smtpd_recipient_restrictions = permit_sasl_authenticated permit_mynetworks reject_unauth_destination'

# install letsencrypt for TLS/SSL
# apt install letsencrypt
# letsencrypt certonly --standalone -d mail.$DOMAIN_NAME

# set TLS
postconf -e 'smtp_tls_security_level = may'
postconf -e 'smtpd_tls_security_level = may'
postconf -e 'smtp_tls_note_starttls_offer = yes'
postconf -e 'smtpd_tls_key_file=/etc/letsencrypt/live/mail.'$DOMAIN_NAME'/privkey.pem'
postconf -e 'smtpd_tls_cert_file=/etc/letsencrypt/live/mail.'$DOMAIN_NAME'/fullchain.pem'
postconf -e 'smtpd_tls_loglevel = 1'
postconf -e 'smtpd_tls_received_header = yes'
postconf -e 'myhostname = mail.'$DOMAIN_NAME

# set smtps, submission
sed -i 's/#smtp      inet  n       -       y       -       -       smtpd/smtp      inet  n       -       y       -       -       smtpd/' $POSTFIX_MASTER
sed -i 's/#submission inet n       -       y       -       -       smtpd/submission inet n       -       y       -       -       smtpd/' $POSTFIX_MASTER
sed -i 's/#  -o syslog_name=postfix/  -o syslog_name=postfix/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_tls_security_level=encrypt/  -o smtpd_tls_security_level=encrypt/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_sasl_auth_enable=yes/  -o smtpd_sasl_auth_enable=yes/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_reject_unlisted_recipient=no/  -o smtpd_reject_unlisted_recipient=no/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_client_restrictions=$mua_client_restrictions/  -o smtpd_client_restrictions=$mua_client_restrictions/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_helo_restrictions=$mua_helo_restrictions/  -o smtpd_helo_restrictions=$mua_helo_restrictions/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_sender_restrictions=$mua_sender_restrictions/  -o smtpd_sender_restrictions=$mua_sender_restrictions/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_recipient_restrictions=/  -o smtpd_recipient_restrictions=/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject/  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject/' $POSTFIX_MASTER
sed -i 's/#  -o milter_macro_daemon_name=ORIGINATING/  -o milter_macro_daemon_name=ORIGINATING/' $POSTFIX_MASTER
sed -i 's/#smtps     inet  n       -       y       -       -       smtpd/smtps     inet  n       -       y       -       -       smtpd/' $POSTFIX_MASTER
sed -i 's/#  -o syslog_name=postfix/  -o syslog_name=postfix/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_tls_wrappermode=yes/  -o smtpd_tls_wrappermode=yes/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_sasl_auth_enable=yes/  -o smtpd_sasl_auth_enable=yes/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_reject_unlisted_recipient=no/  -o smtpd_reject_unlisted_recipient=no/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_client_restrictions=$mua_client_restrictions/  -o smtpd_client_restrictions=$mua_client_restrictions/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_helo_restrictions=$mua_helo_restrictions/  -o smtpd_helo_restrictions=$mua_helo_restrictions/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_sender_restrictions=$mua_sender_restrictions/  -o smtpd_sender_restrictions=$mua_sender_restrictions/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_recipient_restrictions=/  -o smtpd_recipient_restrictions=/' $POSTFIX_MASTER
sed -i 's/#  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject/  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject/' $POSTFIX_MASTER
sed -i 's/#  -o milter_macro_daemon_name=ORIGINATING/  -o milter_macro_daemon_name=ORIGINATING/' $POSTFIX_MASTER

systemctl restart postfix.service
