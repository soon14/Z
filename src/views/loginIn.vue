<template>
    <div class='login-box'>
        <div >
            <div class='login-top'>
                <div class='login-left'>
                    <a :href="backUrl" target="_blank"> <img src="http://img.zsydian.com/icon/logoin.png" width='50' height='50'></a>
                    <div>
                        <h1 style="margin:0;color:rgba(45,139,241,0.9)">智胜云</h1>
                        <p style="margin:-30px 0 0 0;color:rgba(45,139,241,0.7)">助力零售数智化转型</p>
                    </div>
                </div>
                <div class='login-right'>
                    <span>客服热线：0512 - 87816917</span>
                </div>
            </div>
            <div class='login-in' >
                <div class="login-left-img img"></div>
                <div class='login-flex' v-if='islogin'>
                    <ul class='login-l-title'>
                        <span class='title-l'>{{act}}</span><!--账号登陆-->
                        <li>
                            <img :src="item" v-for='(item,index) in imgArr' v-if='index==numindex' :key='index' width='60' height='60'@click='clickImg(index)'>
                        </li>
                    </ul>
                    <div v-if='!isewm'>
                        <div class='ewm' >
                            <div class="erweima-box">
                                <img src="http://img.zsydian.com/icon/androidCode.png" alt="" >
                            </div>
                            <span style='color:#345C87;margin-top:10px;padding-bottom: 100px;'>用app扫描上放二维码登录到智胜云平台</span>
                        </div>
                    </div>
                    <div v-if='isewm' style='width:100%;padding:0 30px'>
                        <div class='login-l'  style=';border:none'>
                           <mu-text-field  v-model="username"  :label="$t('login.Rmobile')" :placeholder="$t('login.RmobilePlaceholder')" style='width:100%'></mu-text-field><br/>
                        </div>
                        <div class='login-l' style='border:none;margin:0'>
                            <mu-text-field v-model="pss" 
                            :label="$t('login.loginPassword')" 
                            :placeholder="$t('login.RpasswordPlaceholder')" 
                            style='width:100%'
                            autocomplete="new-password"
                            :action-icon="visibility ? 'visibility' : 'visibility_off'" 
                            :action-click="()=>{visibility = !visibility}" 
                            :type="visibility ? 'text' : 'password'"
                            @keyup.enter='enterLogin'
                            ></mu-text-field><br/>
                        </div>
                        <div class="zdlogin">
                            <div style='color:#989898'>
                                <Checkbox v-model='autoLogin' @on-change='autoLoginChange'></Checkbox>
                                <span  class='threeZD'>记住密码</span>
                            </div>
                            <div @click="forgetPass" style='color:#989898;cursor:pointer' >
                               <span class='threezc'>{{$t('login.forgetPss')}}?</span>
                            </div><!--忘记密码-->
                        </div>
                        <div style='width:460px;color:#ff0000' v-if='errorCode'>{{errortext}}</div>
                        <div class='login-l' style='border:none;margin-top: 50px;'>
                             <Button type="primary" class='loginBtn' @click='loginIn'>登陆</Button>
                        </div>
                        <div class='login-l' style='border:none'>
                             <Button type="ghost" class='loginBtn' @click='regist'>注册</Button>
                        </div>
                    </div>
                </div>
                <div v-if='isregister' class='login-flex'>
                    <div class='login-l-titleR'>
                        <span class='title-l'>注册</span>
                        <div class='backLogin' @click="backLogin">
                           <span  >登录</span>
                           <img alt="" src="//account.weimob.com/img/arrow.svg">
                        </div>
                    </div>
                    <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                        <mu-form-item :label="$t('login.Rmobile')"  prop="mobile" :rules="usernameRules"><!--手机号-->
                            <mu-text-field v-model="validateForm.mobile" prop="mobile" :placeholder="$t('login.RmobilePlaceholder')"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item :label="$t('login.Vcode')" prop="code"  :rules="codeRules" ><!--验证码-->
                            <div style='display:flex;width:100%'>
                                <mu-text-field :placeholder="$t('login.VcodePlaceholder')"  v-model="validateForm.code" prop="code"></mu-text-field>
                                <Button  style='height: 40px;color:#5C8AD9;margin-top:-5px;text-align:center;border-color:#5C8AD9;background#fff' v-show="showGetCode"  @click='getValCode'>{{$t('login.getVcode')}}</Button>
                                <Button style='height: 40px;color:#5C8AD9;margin-top:-5px;text-align:center;border-color:#5C8AD9' v-show="timeNum" :disabled='singabled' >{{secNum}}{{$t('login.getVcode1')}}</Button>
                           
                            </div>
                             <div v-if='valRegistCode' style='color:#ff0000'>{{valRegistText}}</div>
                        </mu-form-item>
                        <mu-form-item :label="$t('login.loginPassword')" prop="pss"  :rules="passwordRules"><!--密码-->
                            <mu-text-field 
                            type="password" 
                            :placeholder="$t('login.pssNum')"  
                            autocomplete="new-password" 
                            v-model="validateForm.pss" 
                            prop="pss"
                            :action-icon="visibility ? 'visibility' : 'visibility_off'" 
                            :action-click="() => {visibility = !visibility}" 
                            :type="visibility ? 'text' : 'password'"
                            ></mu-text-field>
                            <!--请填写6至20位密码-->
                        </mu-form-item>
                         <mu-form-item>
                         <Button type="primary" class='loginBtn loginBtnRegister' @click="clickRefister">
                             <!--注册并登陆-->
                             {{$t('login.randl')}}
                        </Button>
                        </mu-form-item>
                        
                            <!-- <mu-checkbox label="同意用户协议" @change='onChange' v-model="validateForm.v"></mu-checkbox> -->
                        <div style='width:100%;text-align:center;margin-top:-20px;font-size:14px'>
                            <span >{{$t('login.clicktop')}}<span style='color:#5C8AD9;cursor:pointer' @click='onChange'>
                                <!--《同意用户协议》-->
                                {{$t('login.tk')}}
                            </span></span>
                        </div>
                    </mu-form>
                </div>
                <div v-if='isforget' class='login-flex'>
                    <!--忘记密码-->
                    <div class='login-l-titleR'>
                        <span class='title-l'>修改密码</span>
                         <div class='backLogin' @click="backLogin">
                           <span  >登录</span>
                           <img alt="" src="//account.weimob.com/img/arrow.svg">
                        </div>
                    </div>
                   
                    <div class="mu-demo-form"  v-if='forgotStep1'>
                        <mu-form ref="forget1" :model="validateFormforget">
                            <mu-form-item label="手机号" prop="forgetMobile" :rules="forgetrules">
                                <mu-text-field v-model="validateFormforget.forgetMobile"
                                prop="forgetMobile"
                                placeholder="请输入手机号" style='width:100%'>
                                </mu-text-field>
                            </mu-form-item>
                            <div style='display:flex;width:100%'>
                                <mu-form-item :label="$t('login.VcodePlaceholder')" prop="forgetcode" :rules="forgetrulesCode" style='width:100%'>
                                    <mu-text-field 
                                    v-model="validateFormforget.forgetcode"
                                    prop="forgetcode" 
                                    :placeholder="$t('login.VcodePlaceholder')" >
                                    </mu-text-field>
                                </mu-form-item>
                               <Button style='height: 40px;color:#5C8AD9;margin-top:20px;text-align:center;border-color:#5C8AD9;background#fff' v-show="showGetCode1"  @click='getValCode1'>{{$t('login.getVcode')}}</Button><!--发送验证码-->
                               <Button style='height: 40px;color:#5C8AD9;margin-top:20px;text-align:center;border-color:#5C8AD9' v-show="timeNum1" :disabled='singabled1' >{{secNum1}}{{$t('login.getVcode1')}}</Button><!--60s-->
                                
                            </div>
                            <div v-if='valRegistCode1' style='color:#ff0000;margin-bottom:10px;margin-top:-20px'>{{valRegistText1}}</div>
                            <Button type="primary" class='loginBtn loginBtnRegister' @click="forgetNext">{{$t('public.next')}}</Button><!--下一步-->
                        </mu-form>
                        </div>
                        <div class="mu-demo-form"  v-if='forgotStep2'>
                            <mu-form ref="forget2" :model="validateFormforget2">
                                 <mu-form-item :label="$t('info.newpss')" prop="forgetpss" :rules="forgetpssrules"><!--新密码-->
                                    <mu-text-field v-model="validateFormforget2.forgetpss"
                                    prop="forgetpss"
                                    autocomplete="new-password"
                                    type="password"
                                    :placeholder="$t('login.RpasswordPlaceholder')" style='width:100%'
                                    :action-icon="visibility1 ? 'visibility' : 'visibility_off'" :action-click="() => {visibility1 = !visibility1}" :type="visibility1 ? 'text' : 'password'"
                                    >
                                    </mu-text-field>
                                </mu-form-item>
                                <mu-form-item :label="$t('login.RaginPassword')" prop="forgetpss" :rules="forgetpss1rules"><!--确认密码-->
                                    <mu-text-field v-model="validateFormforget2.forgetpss1"
                                    prop="forgetpss1"
                                    autocomplete="new-password"
                                    type="password"
                                    :placeholder="$t('login.RaginPasswordPlaceholder')" style='width:100%'
                                    :action-icon="visibility2 ? 'visibility' : 'visibility_off'" 
                                    :action-click="() => {visibility2 = !visibility2}" 
                                    :type="visibility2 ? 'text' : 'password'"
                                    ><!--请再次输入密码-->
                                    </mu-text-field>
                                </mu-form-item>
                                <div v-if='newErrorCode' style='color:#ff0000;margin-bottom: 20px;margin-top: -20px;'>{{newErrorText}}</div>
                                <Button type="primary" class='loginBtn loginBtnRegister' @click="forgetNext2">{{$t('public.next')}}</Button><!--下一步-->
                            </mu-form>
                            
                        </div>
                        <div class="mu-demo-form"  v-if='forgotStep3'>
                            
                            <div class='success' style='width:100%'>
                                <Icon type="checkmark-circled" size='120' style='color:#40ca98'></Icon>
                                <div style='margin:20px 0'>{{$t('login.pssSuccess')}}</div><!--密码找回成功！-->
                                <div style='margin:20px 0'>{{three}}秒后自动跳转到登录页</div>
                                <Button type="primary" class='loginBtn loginBtnRegister' @click="goback">{{$t('login.return')}}</Button>
                                <!--返回登陆-->
                            </div>
                        </div>
                        
                </div>
            </div>
            <div class='Copyright'>
                <p>Copyright &copy;2018-2020  <a href="https://www.zsydian.com" target="_blank" >智胜云</a>
                    <span style="margin-left:10px">沪ICP备14051887号-22</span>
                </p>
            </div>
        </div>
        <div class='addHottx'>
            <div class='Model-top'>
                <span class='top-title'>智胜云科技服务条款</span><!--智胜云科技服务条款-->
                <Button style='background:#E66D6D;border:none' size="small" @click='cancel' class='btn'><Icon type="close-round" style='color:#fff'></Icon></Button>
            </div>
            <div class='info'>
                <p >
                    <p class='p'>
                    <strong>一、服务条款</strong>
                    <div class='p-div'>
                    智胜云服务条款（下称“服务条款”）是苏州智胜云科技有限公司（下称“智胜云”）与您就智胜云服务等相关事项所订立的有效合约。您通过盖章 、网络页面点击确认或以其他方式选择接受本服务条款，即表示您与智胜云达成协议并同意接受本服务条款的全部约定内容。在接受本服务条款之前，请您仔细阅读本服务条款的全部内容。如果您对本服务条款有任何疑问，请通过客服电话询问智胜云，智胜云将向您解释条款内容。如果您不同意本服务条款的任意内容，或者无法准确理解智胜云对条款的解释，请不要进行后续操作
                    </div>
                    </p>
                    <p class='p'>
                    <strong>二、定义及解释</strong>
                    <div class='p-div'>
                    1.智胜云服务:指智胜云网向您提供的在www.zsydian.com网站和/或智胜云网提供技术支持的其他联盟成员的相关服务和/或界面上所展示的智胜云服务以及相关的技术及网络支持服务。包含免费试用版本及收费正式版本，使用周期与智胜云为您提供服务的周期相同，具体见您账户有效期的提示。
                    2.免费试用版:您首次在智胜云网站注册，则系统将自动为您分配一个免费试用账户，在免费试用期间，智胜云承诺绝不向您收取任何费用。如您未在试用期结束前及时购买收费正式版本或未向智胜云申请试用延期的，则智胜云有权在试用期满当日24点关闭您的试用账户，并删除您的账户信息及资料。
                    3.收费正式版:您向智胜云成功缴纳服务费后将享受智胜云提供的智胜云服务，具体服务项目以您订购页面展示为准。
                    4.服务费:您为购买“智胜云服务”支付的费用，具体数额将在您订购页面予以列明公示，或者由 “智胜云服务销售合同”约定。
                    5.服务费的续费: 您为在约定服务到期后继续使用“智胜云服务”，在约定服务到期前进行服务续费。您在每次续费前有义务再次认真阅读并确保完全理解届时www.zsydian.com网站下《智胜云服务条款》的各项规定，在全部同意该条款所有内容后进行续费，您每次续费行为将视为已阅读并完全理解《智胜云服务条款》最新版且承诺遵守约定。智胜云保留在您未按照约定支付全部费用之前不向您提供服务和/或技术支持，或者终止服务和/或技术支持的权利
                    </div>
                    </p>
                    <p class='p'>
                    <strong>三、您的权利与义务</strong>
                     <div class='p-div'>
                    1.您同意遵守本服务条款以及服务展示页面的相关管理规范及流程。您了解上述协议及规范等的内容可能会不时更新。如本服务条款的任何内容发生变动，智胜云应通过提前30天在 www.zsydian.com 的适当版面公告向您提示修改内容。如您不同意智胜云对服务条款相关条款所做的修改，您有权停止使用智胜云服务，此等情况下，智胜云应与您进行服务费结算（如有），并且您需要自行备份业务数据。如您继续使用智胜云服务，则视为您接受智胜云对服务条款相关条款所做的修改。
                    2.您应按照智胜云在www.zsydian.com网站公示的提示及本服务条款的约定支付相应服务费用。
                    3.您承诺：
                    A.如果您使用智胜云服务进行的经营活动需要获得国家有关部门的许可或批准的，应获得该有关的许可或批准。例如您从事新闻、出版、教育、医疗保健 、药品和医疗器械等，同时您理解并认可，以上列举并不能穷尽列举您进行经营活动需要获得国家有关部门的许可或批准的全部类型，您应获得有关的许可或批准，并应符合国家及地方不时颁布相关法律法规之要求；
                    B.若智胜云的服务涉及第三方软件之许可使用的，您同意遵守相关的许可协议的约束；
                    C.不利用智胜云服务提供的资源和服务上传（Upload）、下载（download）、储存、发布如下信息或者内容，不为他人发布该等信息提供任何便利：①违反国家规定的政治宣传和/或新闻信息；② 涉及国家秘密和/或安全的信息；③ 封建迷信和/或淫秽、色情、下流的信息或教唆犯罪的信息；④ 博彩有奖、赌博游戏、“私服”、“外挂”等非法互联网出版活动；⑤ 违反国家民族和宗教政策的信息；⑥ 妨碍互联网运行安全的信息；⑦ 侵害他人合法权益的信息和/或其他有损于社会秩序、社会治安、公共道德的信息或内容；⑧ 其他违反法律法规、部门规章或国家政策的内容。
                    D.不进行任何破坏或试图破坏网络安全的行为（包括但不限于钓鱼，黑客，网络诈骗，网站或空间中含有或涉嫌散播：病毒、木马、恶意代码，及通过虚拟服务器对其他网站、服务器进行涉嫌攻击行为如扫描、嗅探、ARP欺骗、DOS等）；
                    E.不从事其他违法、违规或违反智胜云服务条款的行为。
                    F. 如智胜云发现您违反上述条款的约定，有权根据情况采取相应的处理措施，包括但不限于立即终止服务、中止服务或删除相应信息等。如果第三方机构或个人对您提出质疑或投诉，智胜云将通知您，您有责任在规定时间内进行说明并出具证明材料，如您未能提供相反证据或您逾期未能反馈的，智胜云将采取包括但不限于立即终止服务、中止服务或删除相应信息等处理措施。因您未及时更新联系方式或联系方式不正确而致使未能联系到您的，亦视为您逾期未能反馈。
                    4.您使用“智胜云服务”进行商务活动所引起的一切法律纠纷均与智胜云无关。
                    5.您对自己使用智胜云服务过程产生的数据以及进入和管理智胜云服务上各类产品与服务的账号、密码的完整性和保密性负责。因您维护不当或保密不当致使上述数据、口令、密码等丢失或泄漏所引起的一切损失和后果均由您自行承担。
                    6.如您违反本合同规定的任何条款，智胜云有权拒绝向您提供智胜云服务，并终止本合同。您已支付的“服务费”不予退还，同时智胜云有进一步追究客户法律责任的权利。
                    </div>
                    </p>
                    <p class='p'>
                    <strong>四、您的权利与义务</strong>
                    <div class='p-div'>
                    1.智胜云应按照合同约定提供服务，保证服务可持续提供。
                    2.智胜云已获得必要的许可和授权，有权按本合同约定为客户提供“智胜云服务”。
                    3.智胜云在客户使用智胜云产品的服务期内在服务器上保存客户的信息，并在客户终止服务使用后永久删除。
                    4.智胜云不向其他任何第三方保证和承诺客户提交的网页和信息符合注册标准，客户自行对其智胜云服务提供的内容、产品、服务等承担全部责任。
                    5.智胜云有权随时删除含有任何危害国家安全、淫秽色情、虚假、侮辱、诽谤、恐吓或骚扰、侵犯他人版权或人身权或其他合法权益等违法或有违社会公序良俗的内容。
                    6.智胜云保留为维护系统升级而短暂停止服务的权利，在暂停服务之前，智胜云将通过网站予以公告。
                    7.如果合同被终止（除由于违反合同协议致使合同终止之外），并且您此时有这项要求的话，智胜云可应您要求在协议终止后的30日之内，向您提供一个关于数据信息的文件或获取文件的方法。在协议终止90天后（或根据客户要求可以提前），系统自动删除这些数据信息。
                    8.智胜云可以根据中国法律法规的调整、行政执法机关的命令和社会伦理道德的变化相应调整智胜云服务的审核标准，客户不得以类似 “以前曾通过智胜云审核 ”的理由要求智胜云继续审核通过。
                    9.服务期限内，智胜云将为您提供如下客户服务：
                    A.智胜云为付费用户提供7×24小时售后故障服务，并为付费用户提供有效的联系方式并保证付费用户能够联系到故障联系人。故障联系人在明确故障后及时进行反馈；
                    B.智胜云提供工作日5×12小时，周末2×8小时的系统在线服务，解答客户在使用中的问题。
                    10.智胜云承诺应严格遵守客户的数据保密义务，明确客户数据的所有权属于客户。
                    </div>
                    </p>
                    <p class='p'>
                    <strong>五、保密责任</strong>
                    <div class='p-div'>
                    1.保密资料指由一方向另一方披露的所有技术及非技术信息（包括但不限于产品资料、产品计划、价格、财务及营销规划、业务战略、客户信息、客户数据、研发 、软件硬件、API应用数据接口、技术说明、设计、特殊公式、特殊算法等）。
                    2.本服务条款任何一方同意对获悉的对方之上述保密资料予以保密，并严格限制接触上述保密信息的员工遵守本条之保密义务。除非国家机关依法强制要求或上述保密资料已经进入公有领域外，接受保密资料的一方不得对外披露。
                    3.本服务条款双方明确认可各自用户信息和业务数据等是各自的重要资产及重点保密信息。本服务条款双方同意尽最大的努力保护上述保密信息等不被披露。一旦发现有上述保密信息泄露事件，双方应合作采取一切合理措施避免或者减轻损害后果的产生。
                    4.本条款不因本服务条款的终止而失效。
                    </div>
                    </p>
                    <p class='p'>
                    <strong>六、违约责任</strong>
                    <div class='p-div'>
                    1.本服务条款任何一方违约均须依法承担违约责任。
                    2.您理解，鉴于计算机、互联网的特殊性，下述情况不属于智胜云违约：
                    A.智胜云在进行智胜云服务配置、维护、升级时，需要短时间中断服务；
                    B.智胜云提供的服务涉及到互联网及相关信息等服务，可能会受到 Internet不稳定因素的影响。因此服务存在因上述不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机、通信网络、Internet等原因等造成您访问智胜云服务速度下降或无法使用；
                    3.由于您的故意或过失导致遭受损失的，智胜云不承担任何责任。
                    4.如因智胜云原因，造成您连续72小时不能正常使用服务的，您可以终止服务，但非智胜云控制之内的原因引起的除外。
                    5.如果智胜云违反服务条款规定的义务，给您造成损失的，赔偿金的最高限额为您有关“智胜云服务”向智胜云首次提出赔偿主张时最近一次续费实际支付的 “智胜云服务”服务费。客户未续费的，以首次支付的“服务费”为限额。
                    6.在任何情况下，智胜云对本服务条款所承担的违约赔偿责任总额不超过违约服务对应之服务费总额。
                    </div>
                    </p>
                    <p class='p'>
                   <strong>七、争议解决</strong>
                    <div class='p-div'>
                    1.本合同的生效、解释、执行、管辖、争议的解决均适用中华人民共和国法律。
                    2.因本合同引起的或与本合同有关的任何争议，双方可友好协商解决；协商不成，可将争议提交南京市仲裁委员会仲裁
                    </div>
                    </p>
                    <p class='p'>
                    <strong>八、服务期限与终止</strong>
                    <div class='p-div'>
                    1.如果你与智胜云已经签署“智胜云系统授权使用协议”，服务期限由该合同约定；如果没有，自您智胜云账户创建成功之日起（而非您获取智胜云的管理员登录号和密码之日起）计算，并以您所缴纳的服务费款项数额为依据确认服务期限。
                    2.发生下列情形，合同提前终止：
                    A.双方协商一致提前终止的；
                    B.您严重违反本服务条款（包括但不限于a.您未按照协议约定履行付款义务，及/或b.您严重违反法律规定等），智胜云有权提前终止服务，并不退还您已经支付的费用；
                    C.您理解并充分认可，虽然智胜云已经建立（并将根据技术的发展不断完善）必要的技术措施来防御包括计算机病毒、网络入侵和攻击破坏（包括但不限于 DDOS）等危害网络安全事项或行为（以下统称该等行为），但鉴于网络安全技术的局限性、相对性以及该等行为的不可预见性，如因此终止服务的，智胜云将按照实际提供服务月份计算（不足一个月的按一个月计）服务费，将剩余款项（如有）返还；
                    D.如因智胜云原因，造成您连续15日不能正常使用服务的，您可以终止服务，智胜云将按照实际提供服务月份计算（不足一个月的按一个月计）服务费，将剩余款项（如有）返还。
                    </div>
                    </p>
                    <p class='p'>
                        <strong>九、特别声明</strong>
                    <div class='p-div'>
                    1.智胜云郑重提示：为享有高效优质的服务，请您务必仔细阅读并确保完全理解www.zsydian.com网站下的《智胜云服务条款》，www.zsydian.com的服务条款是最新版本。您完全理解并认可明白，www.zsydian.com 有“智胜云服务”服务的最新版本，任何人士和机构提供的文件（包括但不限于本合同）中有关“智胜云服务”服务描述与该服务条款矛盾的，以该服务条款为准。
                    2.智胜云有权以提前30天在 www.zsydian.com上公布、或给您发网站内通知或书面通知的方式将本服务条款的权利义务全部或者部分转移给智胜云的关联公司。
                    3.如果任何条款在性质上或其他方面理应地在此协议终止时继续存在，那么应视为继续存在的条款，这些条款包括但不局限于保证条款、保密条款、知识产权条款 、法律适用及争议解决条款。
                    4.本服务条款自2018年1月1日起开始执行。
                    </div>
                    </p>
                    </p>
                
            </div>
            <div class='Bbtn'>
                <Button type='primary' size="small" @click='cancelB' class='btn1'>
                    接受条款内容
                </Button>
            </div>
        </div>
    </div>
</template>
<script>
// import {aesEncrypt,aesDecrypt} from '../components/md5'
import * as types from '../store/types'
import LoadUrl from '@/components/common/actionLoad'
    export default {
        data (){
            return {
                islogin:true,
                isregister:false,
                isforget:false,
                backUrl:LoadUrl.Website.OffProd,//官网
                act:this.$t('login.loginTitle'),//账号登陆
                labelPosition:"right",
                visibility: false,

                visibility1: false,
                visibility2: false,
                isewm:true,
                numindex:0,
                imgArr:[
                    
                    'http://img.zsydian.com/icon/login-06.png',
                    'http://img.zsydian.com/icon/login-079.png',
                    ],
                errorCode:false,
                errortext:"",
                username:"",
                pss:"",
                zh:"zh",
				storeType:[
					{
						label:"中文",
						value:'zh'
					},
					{
						label:"English",
						value:'en'
					}
				],
                autoLogin:false,

                isfsongyzm:false,//注册验证码
                showGetCode:true,
                secNum:60,
                timeNum:false,//是否显示秒数
                singabled:true,
                customerId:"",//注册得用户编号
                valRegistCode:false,
                valRegistText:"",
                validateForm:{
                    mobile:"",
                    pss:"",
                    code:"",
                    v:false//选中同意
                },
                usernameRules:[{ validate: (val) => !!val, message: this.$t('login.RmobilePlaceholder')},//必须填写手机号
                                { validate: (val) => /^1[3|4|5|7|8][0-9]{9}$/.test(val), message: this.$t('login.RmobileisSURE')}],
                passwordRules:[{ validate: (val) => !!val, message: this.$t('login.VcodePlaceholder')},//必须填写密码
                { validate: (val) => val.length>=6 && val.length<=20, message: this.$t('login.pssNum')}//请填写6至20位密码
                ],
                codeRules:[{ validate: (val) => !!val, message:this.$t('login.VcodePlaceholder')},//必须填写验证码
                    { validate: (val) => /[0-9]$/.test(val), message: this.$t('login.VcodeError')}],//验证码错误
                argeeRules: [{ validate: (val) => !!val, message: this.$t('login.mustty')},],//必须同意用户协议


                //忘记密码
                forgotStep3:false,
                forgotStep2:false,
                forgotStep1:true,
                validateFormforget:{
                     forgetMobile:"",//验证手机号
                     forgetcode:"",//验证码
                },
                forgetrules:[{ validate: (val) => !!val, message: this.$t('login.RmobilePlaceholder')},
                { validate: (val) => /^1[3|4|5|7|8][0-9]{9}$/.test(val), message: this.$t('login.RmobileisSURE')}],//必须填写手机号
                forgetrulesCode:[{ validate: (val) => !!val, message: this.$t('login.VcodePlaceholder')},//必须填写验证码
                    { validate: (val) => /[0-9]$/.test(val), message: this.$t('login.VcodeError')}],//验证码错误

                validateFormforget2:{
                    forgetpss:"",//新密码
                    forgetpss1:"",//确认密码
                },
                forgetpssrules:[{ validate: (val) => !!val, message:this.$t('login.enterNewPss')},//必须填写新密码
                        { validate: (val) => val.length>=6 && val.length<=20, message:this.$t('login.pssNum')}],//请填写6至20位密码
                forgetpss1rules:[{ validate: (val) => !!val, message:this.$t('login.RaginPassword')},//请再次确认新密码
                      { validate: (val) => val.length>=6 && val.length<=20, message:this.$t('login.pssNum')}],//请填写6至20位密码
                forgetMobile:"",//验证手机号
                forgetpss:"",//新密码
                forgetpss1:"",//确认密码
                forgetcode:"",//验证码
                newErrorText:"",
                newErrorCode:false,
                mobileCode:false,//手机号验证码不能为空提示
                mobileText:"",
                isfsongyzm1:false,//忘记密码验证码
                showGetCode1:true,//发送验证码按钮显示
                secNum1:60,
                timeNum1:false,//是否显示秒数
                singabled1:true,
                valRegistCode1:false,
                valRegistText1:"",
                three:3,
                timer1:null
            }
        },
        methods:{
            clickImg(i){
                this.numindex=!this.numindex
                if(i==1){
                    this.isewm=true
                    this.act=this.$t('login.loginTitle')//账号登陆
                    
                }
                if(i==0){
                     this.isewm=false
                     this.act=this.$t('login.smlogin')//账号登陆
                }
            },
            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "pss" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();

            },
            //清除cookie
            clearCookie() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            },
            //读取cookie
            getCookie() {
                if (document.cookie.length > 0) {
                	this.autoLogin=true
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'username') {
                            console.log(arr2[1])
                            this.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'pss') {
                            this.pss = arr2[1];
                        }
                    }
                }
            },
            
            //自动登陆
			autoLoginChange(v){
                this.autoLogin=v
                if(v){
                    this.setCookie(this.username, this.pss, 3);//缓存天数3天
                }else{
                    this.clearCookie();
                }
				
            },
            //回车登陆
            enterLogin(){
                this.loginIn()
            },
            getenterprise(uid){
                this.axios.get('enterprise/view?uid='+uid).then(res=>{
                    if(res.data.status==200){
                        let data=res.data
                        sessionStorage.setItem("storelogo",data==undefined?"http://img.zsydian.com/icon/logoin.png":data.rows==undefined?"http://img.zsydian.com/icon/logoin.png":data.rows.logo==undefined?"http://img.zsydian.com/icon/logoin.png":data.rows.logo)
                    }else{
                        this.$notify({
                            title:"",//
                            message:  res.data.errorMessage,
                            type: 'error',
                            position: 'bottom-right'
                        });
                    }
                })
            },
            //点击登录跳转到home页面 首页
			loginIn() {
				if(this.autoLogin==true){
					this.setCookie(this.username, this.pss, 3);//缓存天数3天
				}else{
					this.clearCookie();
				}
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('isselect');
                sessionStorage.removeItem('user');
				//点击登录之后 调登录接口
				this.axios.post('/login?username='+this.username+'&password='+this.pss).then((res) => {
					let data=res.data;
					if(res.data.status == 200) { //登录成功 
                        this.$store.commit(types.LOGIN, res.data.rows.uid);//登陆凭证uid
                        this.$store.commit(types.USER, res.data.rows);//个人信息
                        this.getenterprise(res.data.rows.uid)
                        this.axios.get('getSystem?uid='+res.data.rows.uid).then((res)=>{
                            if(res.data.status==200){
                                let data=res.data.rows
                                let stm=JSON.stringify(data)
                                sessionStorage.setItem("getSystem",stm)
                                sessionStorage.setItem("isselect",data[0].path)
                                
                                if(data.length==1){
                                    this.$router.replace({
                                        name: data[0].path
                                    });
                                }else{
                                    //多个有权限是的模块跳转main
                                    this.$router.replace({
                                        name: data[0].path
                                    });
                                }
                                
                            }else{
                                 this.$notify({
                                    title:"",//
                                    message: res.data.errorMessage,
                                    type: 'error',
                                    position: 'bottom-right'
                                });
                            }
                        })
					}else{
                        this.errorCode=true
                        this.errortext=res.data.errorMessage
                    }
				})
            },
            //立即注册
            regist(){
                this.islogin=false
                this.isregister=true
            },
            //语言切换
             changeLangEvent(v) {
             	this.zh=v
             	this.$i18n.locale=this.zh
             	sessionStorage.local=this.zh
             	console.log(this.$i18n.local)
			},
            //点击忘记密码
            forgetPass(){
                this.islogin=false
                this.isregister=false
                this.isforget=true
                this.validateForm.mobile=''
                this.validateFormforget.forgetMobile=''
                this.validateFormforget.forgetcode==''
                this.validateFormforget2.forgetpss==''
                this.validateFormforget2.forgetpss1==''
                this.forgotStep1 = true;
                this.forgotStep2 = false;
                this.forgotStep3 = false;
                clearInterval(this.timer1);
            },
             //同意
            onChange(v){
                this.validateForm.v=v
                if(v){
                    $('.addHottx').fadeIn()
                }
            },
            //点击差号
            cancel(){
                $('.addHottx').fadeOut()
            },
            //同意确认
            cancelB(){
                this.cancel()
            },
            //点击发送验证码  获得手机验证码
            getValCode: function() {
                //调接口获得验证码
                this.axios.post('/regcode?name='+this.validateForm.mobile).then((res) => {
                    if(res.data.status == 200) {
                        this.isfsongyzm=true
                        var _this=this;
                        this.$Message.success('正在发送验证码,请稍等...');
                        this.timeNum=true;
                        this.showGetCode=false;
                        this.singabled=true
                        var timer=setInterval(function(){
                            _this.secNum--;
                            if(_this.secNum==0){
                                _this.timeNum=false;
                                _this.secNum=60
                                _this.showGetCode=true;
                                clearInterval(timer);
                            }
                        },1000)
                    }else{
                        this.$notify({
                            title:"",//
                            message: res.data.errorMessage,
                            type: 'error',
                            position: 'bottom-right'
                        });
                    }
                })
            },
            //注册并登陆
            clickRefister(){
                this.$refs.form.validate().then((result) => {
                    if(result){
                            //验证验证码
                        this.axios.post('/valregcode?name='+this.validateForm.mobile+'&code='+this.validateForm.code).then((res) => {
                            if(res.data.status == 200) {
                                //调注册接口
                                this.axios.post('/reg?name='+this.validateForm.mobile+'&code='+this.validateForm.code+'&password='+this.validateForm.pss+'&openid='+'&type=0').then((res) => {
                                    if(res.data.status==200){
                                        //POST /reginfo 获得注册用户编号
                                        this.axios.post('/reginfo?name='+this.validateForm.mobile+'&password='+this.validateForm.pss).then(res=>{
                                            if(res.data.status==200){
                                                console.log(res.data)
                                                this.customerId=res.data.rows.id
                                                // 调登录接口
                                                this.axios.post('/login?username='+this.validateForm.mobile+'&password='+this.validateForm.pss).then((res) => {
                                                    let data=res.data;
                                                    if(res.data.status == 200) { //登录成功 
                                                        this.$store.commit(types.LOGIN, res.data.rows.uid);//登陆凭证uid
                                                        this.$store.commit(types.USER, res.data.rows);//个人信息
                                                        //加密密码保存localStorage
                                                        // this.validateForm.pss=aesEncrypt(this.validateForm.pss,"pss")
                                                        // localStorage.setItem("username",this.validateForm.mobile)
                                                        // localStorage.setItem("pss",this.validateForm.pss)
                                                        //登陆进入选中行业
                                                        this.$router.replace({
                                                                name: 'industry'
                                                        });
                                                    }else{
                                                        //登陆失败
                                                        this.$notify({
                                                            title:"",//
                                                            message: res.data.errorMessage,
                                                            type: 'error',
                                                            position: 'bottom-right'
                                                        });
                                                    }
                                                })
                                            }else{
                                                //注册失败
                                                this.$notify({
                                                    title:"",//
                                                    message: res.data.errorMessage,
                                                    type: 'error',
                                                    position: 'bottom-right'
                                                });
                                            }
                                        })
                                    }else{
                                        //验证码错
                                        this.$notify({
                                            title:"",//
                                            message: res.data.errorMessage,
                                            type: 'error',
                                            position: 'bottom-right'
                                        });
                                    }
                                    
                                })
                                
                            }else{
                                //验证码错误
                                this.valRegistCode=true
                                this.valRegistText=res.data.errorMessage
                            }
                        })
                        
                    }
                }); 
                
            },

            //忘记密码第一步
             //点击发送验证码  获得手机验证码POST /forgetcode 发送验证码【找回密码-1
            getValCode1: function() {
                //调接口获得验证码
                this.axios.post('/forgetcode?name='+this.validateFormforget.forgetMobile).then((res) => {
                    if(res.data.status == 200) {
                        this.isfsongyzm1=true
                        var _this=this;
                        this.$Message.success('正在发送验证码,请稍等...');
                        this.timeNum1=true;
                        this.showGetCode1=false;
                        this.singabled1=true
                        var timer1=setInterval(function(){
                            _this.secNum1--;
                            if(_this.secNum1==0){
                                _this.timeNum1=false;
                                _this.secNum1=60
                                
                                _this.showGetCode1=true;
                                clearInterval(timer1);
                            }
                        },1000)
                    }else{
                        this.$notify({
                            title:"",//
                            message: res.data.errorMessage,
                            type: 'error',
                            position: 'bottom-right'
                        });
                    }
                })
            },
            //忘记密码第一步
            forgetNext(){
                 this.$refs.forget1.validate().then((result) => {
                     if(result){
                        if(this.validateFormforget.forgetMobile =='' || this.validateFormforget.forgetcode=='') { //两次输入的密码不一致
                        this.mobileCode=true
                        this.mobileText="手机号或验证码不能为空！"//手机号或验证码不能为空！
                        this.forgetpss = '';
                        this.forgetpss1 = '';
                    }else{
                        this.axios.post('/valforgetcode?name='+this.validateFormforget.forgetMobile+'&code='+this.validateFormforget.forgetcode).then((res) => {
                            if(res.data.status == 200) { //验证码输入成功  进行下一步操作
                                this.valRegistCode1 = false;
                                this.forgotStep1 = false;
                                this.forgotStep2 = true;
                                this.mobileCode=false
                                this.mobileText=''
                            } else {
                                this.valRegistCode1 = true;//验证码出错
                                this.valRegistText1 = res.data.errorMessage;
                            
                            }
                        })
                    }
                     }
                 })
            },
            //第二步
            forgetNext2(){
                this.$refs.forget2.validate().then((result) => {
                     if(result){
                        if(this.validateFormforget2.forgetpss1 != this.validateFormforget2.forgetpss || this.validateFormforget2.forgetpss=='') {
                            this.newErrorCode=true;
                            this.newErrorText="两次输入的密码不一致或密码为空！";
                            this.forgetpss = '';
                            this.forgetpss1 = '';
                        }else{
                            this.newErrorCode=false
                            //调用重置密码 接口 设置密码
                            this.axios.post('/retps?name='+this.validateFormforget.forgetMobile+'&code='+this.validateFormforget.forgetcode+'&password='+this.validateFormforget2.forgetpss).then((res) => {
                                if(res.data.status == 200) { //重置成功
                                    var _this=this;
                                    //重置成功 跳转到成功页面
                                    this.forgotStep2 = false;
                                    this.forgotStep3 = true;
                                    this.timer1=setInterval(function(){
                                        if(_this.three==0){
                                            _this.islogin=true
                                            _this.isregister=false
                                            _this.isforget=false
                                            _this.forgotStep1 = true;
                                            _this.forgotStep2 = false;
                                            _this.forgotStep3 = false;
                                            clearInterval(_this.timer1);
                                        }else{
                                            _this.three--;
                                        }
                                    },1000)
                                }
                            })
                            
                        }
                     }
                 })
            },
            //返回登录
            backLogin(){
                this.islogin=true
                this.isregister=false
                this.isforget=false
                this.forgotStep1 = true;
                this.forgotStep2 = false;
                this.forgotStep3 = false;
                this.three=3
                this.validateFormforget.forgetMobile=''
                this.validateFormforget2.forgetpss=''
                this.validateFormforget.forgetcode=''
                this.validateFormforget2.forgetpss1=''
                this.validateFormforget2.forgetpss=''
                clearInterval(this.timer1);
            },
            //返回登陆
            goback(){
                // this.$router.push('/loginIn')
                this.islogin=true
                this.isregister=false
                this.isforget=false
            },
        },
        mounted() {
            // console.log(window.location.search)
            // var url = window.location.search;
            // var loc = url.substring(url.lastIndexOf('=')+1, url.length);
            // console.log(window.location.search)
            this.getCookie()
			// this.getCookie(aesDecrypt);//获取
            // if(localStorage.getItem("username")){
            //     //取账号密码，解密，自动登录
            //     this.pss=aesDecrypt(localStorage.getItem("pss"),"pss")
            //     this.username=localStorage.getItem("username")
            //     this.loginLocal()
            // }
            //判断浏览器所用语言
			// var language = navigator.browserLanguage?navigator.browserLanguage:navigator.language;
			// if(language=="zh-CN"){

			//   if(sessionStorage.local){
			//     this.zh=sessionStorage.local
			//   }else{
			//     this.zh='zh'
			//   }
			// }else{
			//   this.zh='en'
			// }
		}
    }
</script>
<style scoped>
.login-left-img{
    width:430px;
    height:570px;
    background: url(http://img.zsydian.com/icon/login-left.png) center center no-repeat;
    background-size: cover;
}
.backLogin{
    font-size: 18px;
    color: #b2adbc;
    cursor: pointer;
}
.login-box {
	width: 100%;
	height: 100%;
	overflow: auto;
   
    background: url(http://img.zsydian.com/icon/background.png) center center no-repeat;
    background-size: cover;
}
.login-top{
    display: flex;;
    justify-content: space-between;
    width:100%;
    height:60px;
    line-height: 60px;
    margin-top:10px;
    padding-left:100px
}
.login-left{
    display: flex;
}
.login-left img{
    vertical-align: middle;
    margin-top: 15px;
    margin-right: 10px;
}
.login-right{
     font-size: 16px;
    display:flex;
    padding-right:80px;
    color:rgba(110,110,110,0.9);
}
.ZeroAfter{
    font-size: 14px;
    letter-spacing: 10px;
    margin-left: 15px;
    margin-top: 10px;
    color:#5DA7F4;
}
.Zero{
    font-size:40px;
    color:#5DA7F4
}
.ZeroAfteZ{
    font-size:12px;
    margin-left: 15px;
    color:#5DA7F4;
}
.back{
   border-left: 1px solid #5DA7F4;
    height: 30px;
    display: block;
    text-align: center;
    line-height: 30px;
    margin-top: 15px;
    margin-left:20px
}
.back span{
     margin-left:20px
}
.login-in{
    min-height: 574px;
    width: 100%;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
   display: flex;
 margin-top:45px;
    
}
.login-in .img{
    margin-right:124px;
}
.login-flex{
    width: 480px;
    padding:25px;
     display:flex;
     flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius:6px;
    font-size: 16px;
    box-shadow: 0 15px 30px #F6F0F1
}
.loginName{
    outline: none;
    border: none;
    margin-left: 20px;
    width:400px
}
.login-l{
    border-bottom:1px solid #e4e4e4;
    padding:10px 0;
    display:flex;
    text-align: left;
}
.login-l span{
    width:40px
}
.zdlogin{
   
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    margin-top:-20px;
}
.zdlogin p{
    
    text-align: right;
}
.loginBtn{
    width:100%;
    height:60px;
    font-size:16px;
    /*color:#2f8bf1;*/
}
.loginBtnRegister{
    margin-top:50px;
}
.mu-demo-form {
  width: 100%;
  margin-top:20px
}
.info{
    width:100%;
    height:500px;
    overflow: auto;
    padding:20px 30px;
    
}
.addHottx{
    position: fixed;
    /* height: 50%; */
    width: 50%;
    top: 100px;
    margin-left: 25%;
    z-index: 18;
    overflow: hidden;
    display: none;
    background: #fff;
    box-shadow: 0 0 20px #ccc;
    border-radius: 4px
}
.success{
    text-align: center;
}
.Bbtn{
    width:100%;
    display: flex;
    padding:10px 0;
    justify-content: center;align-items: center;
}
.btn1{
    /*background: #E66D6D;*/
    width:300px;
    height:40px;
    bottom:30px;
    
}
.btn{
    position:absolute;
    right:10px;
    top:8px;
}
.top-title{
    letter-spacing: 5px;
    font-weight: 600;
    font-size:16px;
}
.Model-top{
    position:relative;
    height:40px;
    background: #F7F7F7;
    text-align: center;
    line-height: 40px;
    border-bottom:1px solid #DDDDDD;
}
.info .p{
    padding: 10px 0;
}
.info .p-div{
    
    line-height: 30px;
}
.login-b{
    
    border:none;
    text-align: right;
    color:#5C8AD9;
    font-size:14px;
     margin-bottom:20px;
}
.login-l-title{
    width: 100%;
    padding: 10px 30px 0 30px;
    margin-bottom: 18px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
  
}
.login-l-titleR{
    width: 100%;
    padding: 10px 0;
    margin-bottom: 18px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
  
}
.title-l{
   font-size: 16px;
   color:#2d8bf1;
   line-height: 42px;
   font-size:30px;
}
.ewm{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login-center-top{
    width:100%;
    position:relative;
    height:80px;
    z-index:11;
    font-weight: 100;
    font-size:16px;
}
.threeZD,.threezc{
    font-size:14px;
    color:#2f8bf1;
}
.threeZD:hover{
    cursor:pointer;
    color:#5C8AD9
}
.threezc:hover{
    color:#5C8AD9
}
.top-mark{
	height:50px;
	width:100%;
	background: rgba(0,0,0,.3);
}
.top-title{
    position: absolute;
    top:0;
    text-align: center;
    width: 600px;
    left:50%;
    margin-left: -300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.Copyright{
    position:fixed;
    text-align: center;
    right: 0;
    bottom: 2px;
    left: 0;
    color: #9ea7b4;
    font-size: 12px;
    padding:10px
}
.Copyright a{
    color: #9ea7b4;
}
</style>

