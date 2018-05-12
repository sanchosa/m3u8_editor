import {defineMessages} from 'react-intl'

export default defineMessages({
	test: `Тестовое сообщение`,
	listUpload: `Загрузить список`,
	'yes': `Да`,
	'no': `Нет`,
	'edit': `Изменить`,
	'add': `Добавить`,
	'cancel': `Отменить`,
	'control.edit': `Редактирование`,
	'control.edit.popover.content': `Открывает панель формирования плэйлиста.
		Позволяет управлять элементами листа и распределять элементы по группам.`,
	'control.order': `Сортировка`,
	'control.order.popover.content': `Открывает панель сортировки.
		Позволяет перемещать элементы листа и групп.`,
	'control.export': `Экспорт`,
	'control.export.popover.content': `Открывает панель экспорта плэйлиста.
		Позволяет сохранить сформированный лист.`,
	'listEditor.sorter.groupsSelector.label': `Группа`,
	'listEditor.sorter.groupsSelector.placeholder': `Выберите группу`,
	'order.searchChannel.placeholder': `Введите название канала`,
	'order.channelList.label': `Сортировка каналов`,
	'order.channelList.placeholder': `Выберите группу`,
	'order.groupList.label': `Сортировка групп`,
	'order.groupList.placeholder': `Загрузите список`,
	'edit.playlistName.addon': `Название листа`,
	'edit.playlistName.placeholder': `Введите название листа`,
	'edit.group.add.placeholder': `Введите название группы`,
	'edit.group.add.message': `Группа "{value}" создана`,
	'edit.group.delete.confirm.title': `Удалить группу "{group}" ?`,
	'edit.group.delete.button': `Удалить группу`,
	'edit.channel': `Канал`,
	'edit.channel.delete.confirm.title':
		`Удалить {count, plural, one {# канал} few {# канала} many {# каналов}} ?`,
	'edit.channel.title': `Название`,
	'edit.channel.title.message': `Необходимо ввести название канала`,
	'edit.channel.link': `Ссылка`,
	'edit.channel.link.message': `Необходимо ввести ссылку на канал`,
	'edit.channel.duration': `Длительность`,
	'edit.channel.duration.message': `Необходимо ввести продолжительность трека`,
	'edit.channel.collapse.header': `Дополнительные поля`,
	'edit.channel.tvgName.placeholder': `Название канала в телепрограмме`,
	'edit.channel.audioTrack.popover': `Определение аудио дорожек канала, 
		если эта возможность поддерживается оператором. 
		Коды языка в формате ISO 639-2. 
		Допускается использование нескольких кодов через запятую (e.g.: eng, rus, deu). 
		Первый указанный код будет использован по умолчанию`
})