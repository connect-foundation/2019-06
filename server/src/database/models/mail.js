/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { Op } from 'sequelize';

const DEFALT_PAGING = { offset: 0, limit: 100 };

const model = (sequelize, DataTypes) => {
  const Mail = sequelize.define(
    'Mail',
    {
      no: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      owner: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      category_no: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      prev_category_no: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      mail_template_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      is_important: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reservation_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      message_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      paranoid: false,
      underscored: true,
      tableName: 'tbl_mail',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Mail.associate = ({ User, MailTemplate, Category }) => {
    Mail.belongsTo(User, { foreignKey: 'owner', targetKey: 'no' });
    Mail.belongsTo(MailTemplate, { foreignKey: 'mail_template_id', targetKey: 'no' });
    Mail.belongsTo(Category, { foreignKey: 'category_no', targetKey: 'no' });
  };

  Mail.findAndCountAllFilteredMail = ({
    userNo,
    mailFilter = {},
    mailTemplateFilter = {},
    options = {},
    paging = DEFALT_PAGING,
    order,
  }) => {
    return Mail.findAndCountAll({
      distinct: true,
      ...paging,
      where: {
        owner: userNo,
        ...mailFilter,
      },
      order,
      include: [
        {
          model: sequelize.models.MailTemplate,
          where: {
            ...mailTemplateFilter,
          },
        },
      ],
      raw: true,
      ...options,
    });
  };

  Mail.findAllPastReservationMailByDate = date => {
    return Mail.findAll({
      where: {
        reservation_time: {
          [Op.lte]: date,
        },
      },
      include: [
        {
          model: sequelize.models.MailTemplate,
          include: [sequelize.models.Attachment],
        },
      ],
    });
  };

  Mail.findOneByNoAndUserNo = (no, userNo) => {
    return Mail.findOne({
      where: {
        owner: userNo,
        no,
      },
      include: [
        {
          model: sequelize.models.MailTemplate,
        },
      ],
    });
  };

  Mail.updateByMessageId = (owner, message_id, props) => {
    return Mail.update(
      {
        ...props,
      },
      {
        where: {
          message_id,
          owner,
        },
      },
    );
  };

  Mail.updateAllByNosAndProps = (nos, props) => {
    return Mail.update(
      {
        ...props,
      },
      {
        where: {
          no: {
            [Op.in]: nos,
          },
        },
        include: [
          {
            model: sequelize.models.MailTemplate,
          },
        ],
      },
    );
  };

  Mail.findAllMessasgeIds = (userNo, messsageIds, category_name) => {
    return Mail.findAll({
      where: {
        owner: userNo,
        message_id: {
          [Op.or]: messsageIds,
        },
      },
      include: [
        {
          model: sequelize.models.Category,
          where: {
            user_no: userNo,
            name: category_name,
          },
        },
      ],
      raw: true,
    });
  };

  Mail.deleteByMesssasgeId = (owner, message_id) => {
    return Mail.destroy({
      where: {
        message_id,
        owner,
      },
    });
  };

  Mail.deleteByNoAndUserNo = (no, userNo) => {
    return Mail.destroy({
      where: {
        no,
        owner: userNo,
      },
    });
  };

  Mail.deleteAllByNosAndUserNo = (nos, userNo) => {
    return Mail.destroy({
      where: {
        no: {
          [Op.in]: nos,
        },
        owner: userNo,
      },
    });
  };

  return Mail;
};

export default model;
