#!/bin/bash

DOVECOT_MASTER=/etc/dovecot/conf.d/10-master.conf
DOVECOT_AUTH=/etc/dovecot/conf.d/10-auth.conf
DOVECOT_CONF=/etc/dovecot/dovecot.conf
DOVECOT_MAIL=/etc/dovecot/conf.d/10-mail.conf
DOVECOT_POP3=/etc/dovecot/conf.d/20-pop3.conf

# apt-get install dovecot-common
# apt-get install dovecot-imapd dovecot-pop3d

# set master.conf
sed -i '96c\\  unix_listener /var/spool/postfix/private/auth {' $DOVECOT_MASTER
sed -i '97c\\    mode = 0660' $DOVECOT_MASTER
sed -i '98c\\    user = postfix' $DOVECOT_MASTER
sed -i '99c\\    group = postfix' $DOVECOT_MASTER
sed -i '100c\\  }' $DOVECOT_MASTER

sed -i '10c\\disable_plaintext_auth = yes' $DOVECOT_AUTH
sed -i '100c\\  auth_mechanisms = plain login' $DOVECOT_AUTH
sed -i '30c\\listen = *, ::' $DOVECOT_CONF
sed -i '31c\\protocols = imap imaps pop3 pop3s' $DOVECOT_CONF
sed -i '30c\\mail_location = mbox:~/mail:INBOX=/var/mail/%u' $DOVECOT_MAIL
sed -i '50c\\pop3_uidl_format = %08Xu%08Xv' $DOVECOT_POP3

systemctl restart dovecot
