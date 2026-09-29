import type { AnswerEffect, SinKey, SinOption, SinProfile, SinQuestion } from '../types'

// 七宗罪彩蛋：13 个固定方向，每个方向 2 道同类题，每轮每个方向抽 1 题。
// 每个选项同时记录罪名倾向（scores）与由此推断的玩法信号（effect），推荐复用正式测试的评分引擎。
// 急躁 → 快节奏爆发；懒惰 → 低门槛、高容错；傲慢 → 高上限与掌控；贪婪 → 持续收益；
// 嫉妒 → 爆发与上限、少顾团队；色欲 → 看得见的外观与华丽特效；暴食 → 坦克、高生存、群体持续。

type Scores = Partial<Record<SinKey, number>>
const o = (id: string, label: string, hint: string, scores: Scores, effect: AnswerEffect): SinOption => ({ id, label, hint, scores, effect })
const neutral: SinOption = { id:'any', label:'我无所谓', hint:'本题不计入罪证，也不影响推荐', scores:{}, effect:{} }
const q = (question: Omit<SinQuestion, 'options'> & { options: SinOption[] }): SinQuestion => ({ ...question, options:[...question.options, neutral] })

export const sinQuestions: SinQuestion[] = [
  // 1 · 等待耐心
  q({ id:'wait-cast', slot:1, group:'等待耐心', category:'feel', context:'团本', eyebrow:'读条', title:'老一马上转阶段，你的大招还要读两秒。', description:'那一刻你心里在想什么？', options:[
    o('instant', '读条？这两个字是对我的侮辱', '宁可瞬发按到键盘冒烟', { wrath:2 }, { tags:['instant'], metrics:{ pace:8 } }),
    o('commit', '读完，这一发必须打出全团最大的数字', '投入的每一秒都要连本带利收回来', { greed:1, pride:1 }, { tags:['channel'], metrics:{ burst:8 } }),
    o('handoff', '不读了，让奶妈顺手打一下', '反正团长也看不出来', { sloth:2 }, { metrics:{ difficulty:4 } }),
    o('pose', '读条时正好欣赏自己的新外观', '这个抬手角度我在捏脸界面练过', { lust:2 }, { tags:['graceful','flamboyant'] }),
  ]}),
  q({ id:'wait-queue', slot:1, group:'等待耐心', category:'feel', context:'日常', eyebrow:'排队', title:'名剑大会排了二十分钟，还没排进去。', description:'这二十分钟你在干嘛？', options:[
    o('rage', '在世界频道骂策划', '二十分钟够我骂完三个版本', { wrath:2, envy:1 }, { metrics:{ pace:8, burst:8 } }),
    o('farm', '顺手跑个商、清个日常', '时间就是金钱，日常一个都不能漏', { greed:1, gluttony:1 }, { metrics:{ sustained:8 } }),
    o('nap', '挂机去刷短视频', '排进去了再说，排不进去也行', { sloth:2 }, { metrics:{ difficulty:4, pace:5 } }),
    o('mirror', '去成衣铺第八次换外观', '进场前必须是最好看的版本', { lust:2 }, { tags:['flamboyant','dancer'] }),
  ]}),

  // 2 · 团队担当
  q({ id:'lead', slot:2, group:'团队担当', category:'feel', context:'团本', eyebrow:'开团', title:'团长掉线了，YY 里一片沉默。', description:'你会？', options:[
    o('lead', '我来指挥，都给我闭麦', '民主是灭团的开始', { pride:2 }, { roles:['tank'] }),
    o('heal', '我盯着血条，谁倒了算我的', '然后在心里记下每一个踩圈的人', { pride:1, gluttony:1 }, { roles:['healer'], tags:['scholar','brush'] }),
    o('dps', '我只管打伤害，机制别找我', '机制是T和奶妈的事', { greed:2 }, { roles:['melee','ranged'] }),
    o('afk', '跟着大部队走，顺便蹭吃蹭喝', '我是来被带的，宴席记得摆', { sloth:1, gluttony:1 }, { metrics:{ difficulty:4 } }),
  ]}),
  q({ id:'fill', slot:2, group:'团队担当', category:'feel', context:'团本', eyebrow:'补位', title:'团里缺个T，团长问你能不能切心法。', description:'你的回答是？', options:[
    o('tank', '切，我拉的怪比你们吃的饭都多', '一次拉满，全部带走', { gluttony:2 }, { roles:['tank'], metrics:{ survivability:8 } }),
    o('refuse', '不切，我是来冲伤害统计的', '奶和T？那是另一种人生', { envy:2 }, { roles:['melee','ranged'], metrics:{ burst:8 } }),
    o('healer', '要不我切奶吧，奶妈工资高', '金团分钱，奶妈先拿', { greed:2 }, { roles:['healer'] }),
    o('whatever', '都行，哪个校服好看切哪个', '心法是什么，重要吗', { sloth:1, lust:1 }, { metrics:{ difficulty:4 } }),
  ]}),

  // 3 · 镜中自我
  q({ id:'face', slot:3, group:'镜中自我', category:'looks', context:'社交', eyebrow:'捏脸', title:'建号时，你在捏脸界面待了多久？', description:'诚实回答。', options:[
    o('hours', '三个小时，并且还买了别人的脸型数据', '脸是第一生产力', { lust:2 }, { tags:['graceful','dancer'] }),
    o('perfect', '一个下午，每一根眉毛都要最完美', '别人的脸都有瑕疵，只有我的没有', { pride:2 }, { tags:['subtle','royal'] }),
    o('random', '点随机，点到顺眼的就行', '捏脸界面太磨叽，我要马上进游戏', { sloth:1, wrath:1 }, { tags:['no-pet'], metrics:{ difficulty:4 } }),
    o('copy', '照着排行榜第一的脸捏', '他长那样都能火，我也要', { envy:2 }, { tags:['flamboyant'] }),
  ]}),
  q({ id:'screenshot', slot:3, group:'镜中自我', category:'looks', context:'社交', eyebrow:'截图', title:'你的截图文件夹里最多的是？', description:'打开看看，别骗自己。', options:[
    o('self', '全是自己的角色，各种角度', '尤其是风吹起衣袂的那一瞬间', { lust:2 }, { tags:['graceful','flamboyant'] }),
    o('stats', '伤害统计和排行榜', '证据要留好', { pride:1, envy:1 }, { metrics:{ ceiling:8.3, burst:8 } }),
    o('loot', '每一次出小橙武的瞬间', '截图是为了记住我赚了多少', { greed:2 }, { tags:['wealthy','gold'] }),
    o('food', '家园的宴席和一桌子菜', '吃得好才是真的好', { gluttony:2 }, { metrics:{ survivability:7.8 } }),
  ]}),

  // 4 · 冲锋本能
  q({ id:'charge', slot:4, group:'冲锋本能', category:'feel', context:'战场', eyebrow:'开战', title:'战场刚开，对面还在集结。', description:'你会？', options:[
    o('rush', '直接冲进人堆', '先打了再说，死了再说', { wrath:2 }, { ranges:['melee'], metrics:{ mobility:8 } }),
    o('flank', '绕后找落单的奶妈', '专挑软柿子捏', { envy:1, greed:1 }, { tags:['assassin'], metrics:{ burst:8 } }),
    o('hold', '站在后排等别人先上', '让肉先冲，我收人头', { sloth:1, greed:1 }, { ranges:['ranged'] }),
    o('pull', '把对面一群人全拉过来', '一个一个打太慢了', { gluttony:2 }, { roles:['tank'], metrics:{ survivability:8 } }),
  ]}),
  q({ id:'duel', slot:4, group:'冲锋本能', category:'feel', context:'名剑大会', eyebrow:'切磋', title:'主城有人对你发起了切磋。', description:'你的反应是？', options:[
    o('accept', '秒接，谁怕谁', '输了再来一百次', { wrath:2 }, { ranges:['melee'], metrics:{ pace:8 } }),
    o('check', '先看他装备分，比我低才接', '只打装备比我差的', { pride:1, envy:1 }, { metrics:{ ceiling:8.3 } }),
    o('ignore', '拒绝，懒得打', '切磋又不给奖励', { sloth:1, greed:1 }, { metrics:{ difficulty:4 } }),
    o('flirt', '接，但主要是想加个好友', '打着打着就成情缘了', { lust:2 }, { tags:['dancer','graceful'] }),
  ]}),

  // 5 · 收藏执念
  q({ id:'store', slot:5, group:'收藏执念', category:'looks', context:'社交', eyebrow:'商城', title:'商城上新了一套限定外观。', description:'你的钱包说？', options:[
    o('buy', '买，全色都买', '外观就是我的第二条命', { lust:1, greed:1 }, { tags:['flamboyant','wealthy'] }),
    o('first', '首日就要穿出去，让所有人看到', '我不是最先买的，但我要最先被看到', { pride:2 }, { tags:['royal','gold'] }),
    o('envy', '不买，但别人穿了我很不爽', '好看是好看，凭什么他有', { envy:2 }, { tags:['dark'] }),
    o('box', '等盒子便宜再说', '反正早晚会降价', { sloth:1, greed:1 }, { metrics:{ sustained:8 } }),
  ]}),
  q({ id:'bag', slot:5, group:'收藏执念', category:'looks', context:'家园', eyebrow:'仓库', title:'打开你的仓库，里面是？', description:'家园仓库也算。', options:[
    o('hoard', '塞满了，什么都舍不得卖', '万一以后有用呢', { greed:2 }, { tags:['dot'], metrics:{ sustained:8 } }),
    o('food', '一半是吃的', '小药、宴席、烤串，一样都不能少', { gluttony:2 }, { metrics:{ survivability:7.8 } }),
    o('outfit', '全是外观、挂件、马具', '每一件都有合适的场合', { lust:2 }, { tags:['flamboyant','pet'] }),
    o('mess', '不知道，塞满了就没再打开过', '整理仓库比打本还累', { sloth:1, gluttony:1 }, { metrics:{ difficulty:4 } }),
  ]}),

  // 6 · 钻研态度
  q({ id:'guide', slot:6, group:'钻研态度', category:'feel', context:'日常', eyebrow:'攻略', title:'新版本心法改动了，你会？', description:'看看你的学习习惯。', options:[
    o('write', '自己算数据，写攻略给别人看', '我就是攻略本身', { pride:2 }, { metrics:{ ceiling:8.6, difficulty:6.4 } }),
    o('copy', '抄排行榜第一的奇穴和配装', '他怎么点我就怎么点', { envy:2 }, { metrics:{ ceiling:8.2 } }),
    o('skip', '不看，打起来再说', '改了就改了，打不好就骂策划', { wrath:2 }, { metrics:{ difficulty:4.2 } }),
    o('wait', '等武学助手更新了再说', '官方都会教的', { sloth:2 }, { metrics:{ difficulty:4 } }),
  ]}),
  q({ id:'meta', slot:6, group:'钻研态度', category:'feel', context:'团本', eyebrow:'强势心法', title:'这赛季某个心法特别强。', description:'你会？', options:[
    o('reroll', '立刻练一个', '版本之子，舍我其谁', { envy:2 }, { metrics:{ burst:8, ceiling:8.2 } }),
    o('prove', '坚持玩自己的，打得比他们高', '强是心法强，高是我厉害', { pride:2 }, { metrics:{ ceiling:8.6 } }),
    o('both', '都练，全心法都要有', '小号比帮会人数还多', { gluttony:1, greed:1 }, { roles:['healer','tank'] }),
    o('meh', '强不强跟我没关系', '我只是来家园种菜拍照的', { sloth:1, lust:1 }, { metrics:{ difficulty:4, survivability:7 } }),
  ]}),

  // 7 · 陪伴方式
  q({ id:'partner', slot:7, group:'陪伴方式', category:'looks', context:'社交', eyebrow:'情缘', title:'关于情缘，你的态度是？', description:'剑三人都懂。', options:[
    o('many', '情缘在精不在多，但我都要', '每个服务器都有一个', { lust:1, gluttony:1 }, { tags:['dancer','flamboyant'] }),
    o('rich', '情缘必须是老板', '能带我躺金团、给我买外观的那种', { greed:1, lust:1 }, { tags:['wealthy'] }),
    o('818', '我没有，但我看完了所有818', '别人的情缘比我自己的还精彩', { envy:2 }, { tags:['dark'] }),
    o('pet', '有宠物就够了', '宠物不会背叛我', { sloth:1, lust:1 }, { tags:['pet'] }),
  ]}),
  q({ id:'mount', slot:7, group:'陪伴方式', category:'looks', context:'家园', eyebrow:'同行', title:'你最想带什么出门？', description:'只问画面。', options:[
    o('horse', '最贵的马，配最贵的马具', '骑在马上就是全场焦点', { lust:1, pride:1 }, { tags:['mounted'] }),
    o('beast', '一堆宠物跟在后面', '越多越热闹', { gluttony:2 }, { tags:['pet'] }),
    o('alone', '一个人，一把兵器', '同行者只会拖慢我', { pride:1, wrath:1 }, { tags:['no-pet','wanderer'] }),
    o('sit', '不出门，在家园坐着', '出门太累了', { sloth:2 }, { metrics:{ difficulty:4 } }),
  ]}),

  // 8 · 比较之心
  q({ id:'dps-meter', slot:8, group:'比较之心', category:'feel', context:'团本', eyebrow:'统计', title:'打完老王，伤害统计出来了，你排第二。', description:'第一名是个同心法的。', options:[
    o('check', '立刻查他的装备和奇穴', '差在哪里我必须知道', { envy:2 }, { metrics:{ ceiling:8.4, burst:8 } }),
    o('excuse', '他站位好罢了，换我也一样', '我的操作明明更好', { pride:2 }, { metrics:{ ceiling:8.4 } }),
    o('rage', '在团里打字说统计不准', '一定是插件的问题', { wrath:2 }, { metrics:{ pace:8 } }),
    o('fine', '第二名，挺好，能分钱就行', '统计又不发工资', { greed:1, sloth:1 }, { metrics:{ sustained:8 } }),
  ]}),
  q({ id:'arena', slot:8, group:'比较之心', category:'feel', context:'名剑大会', eyebrow:'段位', title:'好友的名剑大会段位比你高了。', description:'你会？', options:[
    o('grind', '今晚不睡了，打到比他高', '输给谁都行，就是不能输给他', { envy:2 }, { metrics:{ pace:8, burst:8 } }),
    o('carry', '找人带我打上去', '段位就是用来买的', { greed:1, sloth:1 }, { metrics:{ difficulty:4 } }),
    o('scorn', '段位能说明什么，打一场就知道了', '我的实力不需要数字证明', { pride:2 }, { metrics:{ ceiling:8.6 } }),
    o('smash', '砸键盘', '然后再买一个', { wrath:2 }, { ranges:['melee'] }),
  ]}),

  // 9 · 失误处理
  q({ id:'wipe', slot:9, group:'失误处理', category:'feel', context:'团本', eyebrow:'灭团', title:'灭团了，回放显示是你踩了圈。', description:'你会？', options:[
    o('blame', '奶妈怎么没奶我', '甩锅是一门艺术', { pride:1, wrath:1 }, { roles:['melee','ranged'] }),
    o('silent', '假装掉线', '只要我不说话，就没人知道', { sloth:2 }, { metrics:{ difficulty:4 } }),
    o('rage', '怒退团', '这个团配不上我', { wrath:2 }, { metrics:{ pace:8 } }),
    o('tank', '下一把换我去扛', '我皮糙肉厚，踩了也死不了', { gluttony:2 }, { roles:['tank'], metrics:{ survivability:8.2 } }),
  ]}),
  q({ id:'death', slot:9, group:'失误处理', category:'feel', context:'战场', eyebrow:'阵亡', title:'你在战场被秒了。', description:'躺在地上的你在想什么？', options:[
    o('revenge', '记住他的名字，复活就去找他', '此仇不报非君子', { wrath:2 }, { metrics:{ burst:8 } }),
    o('tanky', '下次换个更耐打的心法', '死太快了，一点都不爽', { gluttony:2 }, { metrics:{ survivability:8 } }),
    o('lie', '躺着挺舒服的，不起来了', '等战场结束就行', { sloth:2 }, { metrics:{ difficulty:4 } }),
    o('pose', '死得好看吗？', '倒下的姿势要优雅', { lust:2 }, { tags:['graceful'] }),
  ]}),

  // 10 · 高光时刻
  q({ id:'highlight', slot:10, group:'高光时刻', category:'looks', context:'战场', eyebrow:'高光', title:'你最想被截图的瞬间是？', description:'只问画面。', options:[
    o('solo', '一个人从三个人手里逃走', '背影潇洒，技能特效拉满', { pride:1, lust:1 }, { tags:['graceful','flight'] }),
    o('aoe', '一个大招带走一片', '满屏都是我的特效', { gluttony:1, lust:1 }, { tags:['flamboyant'] }),
    o('orange', '拿着小橙武站在主城', '让所有人都看到', { greed:1, pride:1 }, { tags:['wealthy','gold'] }),
    o('kill', '一套带走对面的主力', '伤害数字比截图还好看', { envy:1, wrath:1 }, { tags:['assassin','subtle'] }),
  ]}),
  q({ id:'hometown', slot:10, group:'高光时刻', category:'looks', context:'家园', eyebrow:'家园', title:'你的家园是什么样子？', description:'家园也是一种展示。', options:[
    o('palace', '全服最豪华，参观要排队', '比别人的家园都好看', { pride:1, envy:1 }, { tags:['wealthy','royal'] }),
    o('garden', '全是花草和摆件，适合拍照', '家园就是我的摄影棚', { lust:2 }, { tags:['graceful','pink'] }),
    o('farm', '种满了菜，每天都要收', '菜能卖钱', { greed:2 }, { tags:['medicine','green'] }),
    o('empty', '空的，家园是给闲人玩的', '我的实力不需要摆件证明', { sloth:1, pride:1 }, { metrics:{ difficulty:4 } }),
  ]}),

  // 11 · 贪多程度
  q({ id:'loot', slot:11, group:'贪多程度', category:'feel', context:'团本', eyebrow:'拍卖', title:'老王掉了一件好装备，团里开始拍卖。', description:'你会？', options:[
    o('bid', '出价，出到全团都不敢跟', '这件是我的，谁也别想', { greed:2 }, { metrics:{ sustained:8 } }),
    o('all', '所有东西都要拍一下', '不管用不用得上', { gluttony:1, greed:1 }, { tags:['dot'], metrics:{ sustained:8 } }),
    o('watch', '看着别人拍走，心里骂一句', '有钱了不起啊', { envy:2 }, { metrics:{ burst:8 } }),
    o('sleep', '拍卖的时候已经挂机了', '分钱的时候叫我', { sloth:2 }, { metrics:{ difficulty:4 } }),
  ]}),
  q({ id:'pull', slot:11, group:'贪多程度', category:'feel', context:'团本', eyebrow:'拉怪', title:'小怪一波接一波，你想一次拉多少？', description:'问的是贪心程度。', options:[
    o('all', '整个地图的怪全拉过来', '一次打完，省时省力', { gluttony:2 }, { roles:['tank'], metrics:{ survivability:8.4 } }),
    o('two', '两三波，打起来才过瘾', '伤害统计才好看', { gluttony:1, envy:1 }, { tags:['dot'], metrics:{ sustained:8 } }),
    o('one', '一波一波来，稳妥', '拉多了会灭', { pride:1 }, { metrics:{ ceiling:8 } }),
    o('none', '别拉我，我跟在后面打', '拉怪是T的事', { sloth:2 }, { metrics:{ difficulty:4 } }),
  ]}),

  // 12 · 精力分配
  q({ id:'daily', slot:12, group:'精力分配', category:'feel', context:'日常', eyebrow:'日常', title:'每周的日常、周常、大战，你怎么安排？', description:'剑三的日常永远做不完。', options:[
    o('all', '全做完，一个都不能漏', '小号也要做', { gluttony:1, greed:1 }, { metrics:{ sustained:8, survivability:7.5 } }),
    o('rush', '只做奖励最高的，做完就下线', '效率第一', { wrath:1, greed:1 }, { metrics:{ pace:8 } }),
    o('carry', '找代练', '我的时间比金币值钱', { sloth:1, pride:1 }, { metrics:{ difficulty:4 } }),
    o('skip', '看心情，不爽就不做', '日常而已，凭什么要我天天打卡', { sloth:1, wrath:1 }, { metrics:{ difficulty:4, pace:5 } }),
  ]}),
  q({ id:'lucky', slot:12, group:'精力分配', category:'feel', context:'日常', eyebrow:'奇遇', title:'好友触发了你蹲了三年的奇遇。', description:'你的感受是？', options:[
    o('cry', '当场破防，决定再蹲三年', '凭什么是他', { envy:2 }, { metrics:{ ceiling:8.2 } }),
    o('buy', '去交易行买一个更贵的', '能用钱解决的都不叫事', { greed:1, pride:1 }, { tags:['wealthy'] }),
    o('quit', '下线了，今天不玩了', '气到卸载，明天再装回来', { wrath:2 }, { metrics:{ difficulty:4 } }),
    o('congrats', '恭喜他，然后要他的截图', '奇遇特效真好看', { lust:2 }, { tags:['flamboyant','graceful'] }),
  ]}),

  // 13 · 心之所向
  q({ id:'dream', slot:13, group:'心之所向', category:'looks', context:'社交', eyebrow:'梦想', title:'如果剑三能实现一个愿望，你想要？', description:'只能选你最想要的。', options:[
    o('fame', '全服都知道我的名字', '818 里的主角也算', { pride:2 }, { tags:['royal','flamboyant'] }),
    o('rich', '金币用不完', '外观全买，金团全躺', { greed:2 }, { tags:['wealthy','gold'] }),
    o('beauty', '全服最好看的角色', '走到哪里都有人截图', { lust:2 }, { tags:['graceful','dancer'] }),
    o('rest', '不用做日常也能拿奖励', '最好连上线都不用', { sloth:2 }, { metrics:{ difficulty:4 } }),
  ]}),
  q({ id:'title', slot:13, group:'心之所向', category:'looks', context:'社交', eyebrow:'称号', title:'你最想挂哪个称号？', description:'称号是剑三人的第二张脸。', options:[
    o('champion', '名剑大会第一', '所有人都要仰望我', { pride:1, envy:1 }, { tags:['subtle'], metrics:{ ceiling:8.6 } }),
    o('tycoon', '富甲一方', '钱能说明一切', { greed:2 }, { tags:['wealthy'] }),
    o('glutton', '大胃王', '吃遍江湖每一道菜', { gluttony:2 }, { tags:['heavy'] }),
    o('rage', '一怒冲冠', '别惹我', { wrath:2 }, { tags:['heavy','red'] }),
  ]}),
]

export function createSinQuestionSet(): SinQuestion[] {
  return Array.from({ length:13 }, (_, index) => {
    const pool = sinQuestions.filter((question) => question.slot === index + 1)
    return pool[Math.floor(Math.random() * pool.length)]
  })
}

export const sinProfiles: SinProfile[] = [
  { key:'pride', name:'傲慢', alias:'天下第一的独行侠', verdict:'你想掌控局面，也相信自己值得被仰望；钻研到极致，然后让所有人看见。', playstyle:'适合操作上限高、愿意承担难度，甚至能指挥全团的心法。', taglines:['你不是在打本，你是在给团里上课。', '你的奇穴配置，别人抄了也打不出你的效果。', '你看攻略只是为了找作者的错。', '你踩圈的时候，一定是圈的位置不对。', '团长是个头衔，你才是真正的指挥。', '你说“随便打打”的时候，统计第一还是你。', '你的好友列表里，只有比你菜的人。', '你连切磋都要赢得好看。'] },
  { key:'greed', name:'贪婪', alias:'精打细算的金团老板', verdict:'你想要回报，喜欢积累，每一分投入都要看到收益。', playstyle:'适合持续伤害滚雪球、专注个人输出的心法。', taglines:['金团分钱的时候，你比团长还积极。', '你的仓库比你的背包更满。', '拍卖场上，你永远是最后一个出价的。', '你跑商的时候比打本还认真。', '你家园的菜，比你的装备还值钱。', '你练小号不是为了玩，是为了多拿一份奖励。', '你连宠物都要选最值钱的那只。', '你的日常清单比你的待办事项还长。'] },
  { key:'lust', name:'色欲', alias:'全服最靓的崽', verdict:'你想看见自己，也想被人看见；外观和特效比伤害统计更重要。', playstyle:'适合校服好看、招式华丽、角色本体清晰可见的心法。', taglines:['你捏脸用的时间，比你打本的时间还长。', '你截图的次数，比你放技能的次数还多。', '你选门派的标准只有一个：校服好看。', '你在主城站的时间，比在副本里的还长。', '你的情缘列表比你的装备列表还长。', '你倒地的时候也要摆个好看的姿势。', '你的外观衣柜比你的仓库还大。', '你打本不是为了装备，是为了拍照。'] },
  { key:'envy', name:'嫉妒', alias:'盯着统计的追赶者', verdict:'你的动力来自别人：别人有的你要有，别人强的你要更强。', playstyle:'适合爆发窗口鲜明、操作上限高、能直接比出高下的输出心法。', taglines:['你看别人装备的次数比看自己的还多。', '别人触发了奇遇，你当晚就去蹲点。', '你的动力来自别人的伤害统计截图。', '你比别人更清楚别人的奇穴。', '你夸别人的时候，总会加一句“但是”。', '别人成了版本之子，你当晚就练了小号。', '你看818，是为了确认别人过得不如你。', '你不怕输，你怕输给那个人。'] },
  { key:'wrath', name:'暴怒', alias:'一点就着的冲锋者', verdict:'你讨厌等待，手必须一直有事做；先手、速度和直接反馈让你最痛快。', playstyle:'适合节奏快、瞬发多、机动强的近战爆发心法。', taglines:['读条是对你人格的侮辱。', '你退团的速度比你的冲锋还快。', '你在世界频道的发言，比你的技能还多。', '你的键盘比你的角色更需要治疗。', '坦克还在拉怪，你已经冲进去了。', '你开麦的音量足够打断首领读条。', '你的冷静时间只有一个公共冷却。', '你的切磋从不拒绝，也从不认输。'] },
  { key:'gluttony', name:'暴食', alias:'全都要的承载者', verdict:'你喜欢一次处理更多敌人、叠满增益，也愿意站在最危险的地方扛住一切。', playstyle:'适合防御心法、高生存或群体持续伤害的心法。', taglines:['一波怪不够，两波刚好开胃，三波奶妈开始哭。', '你的背包里永远有三十种小药。', '家园的宴席，你是吃得最多的那个。', '你拉怪的方式让T怀疑自己的心法。', '你连宠物的口粮都要备三种。', '你不是在打本，你是在吃自助餐。', '你练的小号，比别人的大号还多。', '你身上的增益图标能铺满两行。'] },
  { key:'sloth', name:'懒惰', alias:'躺平至上的省力派', verdict:'你追求用最少的心力换稳定的体验；游戏是放松，不该变成第二份工作。', playstyle:'适合上手简单、节奏舒缓、容错高的心法。', taglines:['你玩的不是剑三，是挂机模拟器。', '你的最佳操作是跟着团走。', '攻略很长，你的耐心很短。', '你最常用的技能是自动寻路。', '你愿意花钱躺金团，也不愿意自己打。', '你的家园空空如也，因为你从没进去过。', '你不是菜，你只是懒得证明自己不菜。', '宠物比你更努力。'] },
]

// 双罪组合标语：并列或第二名接近第一时显示。键为两个罪名按 sinProfiles 顺序连接。
export const sinPairTaglines: Record<string, string> = {
  'pride+greed':'你想赢，也想全都拿走——还要大家夸你赢得漂亮。',
  'pride+lust':'你要当全服最强，也要当全服最好看。',
  'pride+envy':'你看不起所有人，又偷偷研究每个人的奇穴。',
  'pride+wrath':'你指挥全团，也骂全团。',
  'pride+gluttony':'你要一个人扛下全场，然后告诉所有人是你扛的。',
  'pride+sloth':'你懂所有机制，但懒得亲自去做。',
  'greed+lust':'你买的每一件外观，都是为了截图时更好看。',
  'greed+envy':'别人有的你都要有，别人没有的你更要有。',
  'greed+wrath':'拍卖没拍到的那一刻，你的怒气条满了。',
  'greed+gluttony':'背包、仓库、家园，全部塞满才安心。',
  'greed+sloth':'你想要所有奖励，但最好有人帮你打。',
  'lust+envy':'别人的外观比你好看，这比输统计还难受。',
  'lust+wrath':'你冲得最快，因为要让所有人看清你的新外观。',
  'lust+gluttony':'特效越多越美，怪越多越好看。',
  'lust+sloth':'你愿意花三小时捏脸，但不愿意花三分钟看攻略。',
  'envy+wrath':'被超越的那一刻，你的键盘承受了一切。',
  'envy+gluttony':'别人拉两波，你就要拉三波。',
  'envy+sloth':'你嫉妒大佬，但懒得变成大佬。',
  'wrath+gluttony':'一次拉满，全部打死，打不死就骂。',
  'wrath+sloth':'你想速通，但只想按一个键。',
  'gluttony+sloth':'吃饱了就躺，躺够了再吃。',
}
