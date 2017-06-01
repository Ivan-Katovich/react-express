
window.ee = new EventEmitter();

// ReactDOM.render(
//     // React.createElement('h1', null, 'Hello World!!'), //the same as the next row
//     <h1>Hello, world!</h1>,
//     document.getElementById('root')
// );

var my_news = [
    {
        author: 'Alex Pechkin',
        text: 'On thursday 5th of march ...',
        bigText: 'On thursday 5th of march canons are firing we got a message that war was started'
    },
    {
        author: 'just Vasia',
        text: 'I sure dollar must coasts 35 rub',
        bigText: 'Terrible terrible terrible thing - the dollar for 70 rub'
    },
    {
        author: 'Ivan Katovich',
        text: 'This is a helpful answer.',
        bigText: 'This is a helpful answer. To add to it, the $x function accepts a second optional argument, context. $x(xpath, context) This allows you to select a particular iframe content, for example, and run an xpath query against it. So for the first iframe: myframe = document.getElementsByTagName("iframe")[0].contentWindow.document.body; #to xpath query that iframe for table cells: $x("//td",myframe);'
    },
    {
        author: 'Guest',
        text: 'For free. Download.',
        bigText: 'For free. Download. The best site - http://localhost:3000/'
    }
];

// var News = React.createClass({
//     render: function() {
//         return (
//             <div id="myNews" className="news">
//                 Unfortunately noone news here.
//             </div>
//         );
//     }
// });

var News = React.createClass({
    propTypes: {
        myData: React.PropTypes.array.isRequired
    },

    // getInitialState: function() {
    //     return {
    //         counter: 0
    //     };
    // },

    // plusOnClick: function(e){
    //     e.preventDefault();
    //     this.setState({counter: ++this.state.counter});
    // },

    render: function() {
        var data = this.props.myData,
            newsTemplate;

        if(data.length > 0){
            newsTemplate= data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                )
            });
        }else{
            newsTemplate = <p>Haven't got any news</p>
        }

        // console.log(newsTemplate);
        return (
            <div className='news'>
                {newsTemplate}
                <strong
                   className={'news__count ' + (data.length>0 ? '' : 'none')}>
                    A total: {data.length}
                </strong>
            </div>
        );
    }
});

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },

    getInitialState: function() {
        return {
            visible: false
        };
    },

    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },

    render: function() {
        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible; // считываем значение переменной из состояния компонента

        // console.log('render',this);

        return (
            <div className='article'>
                <p className='news__author'>{author}:</p>
                <p className='news__text'>{text}</p>

                {/* для ссылки readmore: не показывай ссылку, если visible === true ... this could be written in one row*/}
                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news__readmore '+(visible ? 'none' : '')}>
                    Read more ...
                </a>

                <p className={'news__big-text '+(visible ? '' : 'none')}>{bigText}</p>
            </div>
        )
    }
});

// var Comments = React.createClass({
//     render: function() {
//         return (
//             <div id="myComments" className="comments">
//                 We can't comment anything!!!.
//             </div>
//         );
//     }
// });

var Add = React.createClass({

//    getInitialState: function() {
//        return {
//            inputVal: ''
//        };
//    },

//    readmoreChange: function(e) {
//        this.setState({inputVal: e.target.value});
//    },

    getInitialState: function() { //устанавливаем начальное состояние (state)
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },

	componentDidMount: function() { //ставим фокус в input
		ReactDOM.findDOMNode(this.refs.author).focus();
	},

    onBtnClickHandler: function(e) {
        e.preventDefault();

        var textEl = ReactDOM.findDOMNode(this.refs.text);
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = textEl.value;
        // alert(author + '\n' + text);
		// alert(ReactDOM.findDOMNode(this.refs.author).value);  /значение без использования state
        var item = [{
            author: author,
            text: text,
            bigText: '...'
        }];

        window.ee.emit('News.add', item);

        textEl.value = '';
        this.setState({textIsEmpty: true});
	},

    onCheckRuleClick: function(e) {
        // ReactDOM.findDOMNode(this.refs.alert_button).disabled = !e.target.checked; //значение без использования state
        this.setState({agreeNotChecked: !this.state.agreeNotChecked}); //решение со state
    },

    onAuthorChange: function(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({authorIsEmpty: false})
        } else {
            this.setState({authorIsEmpty: true})
        }
    },

    onTextChange: function(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({textIsEmpty: false})
        } else {
            this.setState({textIsEmpty: true})
        }
    },
	
//     render: function() {
//         return (
// 			<div className='input_text'>
// 				<input className='test-input'
// 					defaultValue=''
// //					{/*onChange={this.readmoreChange}*/}
// 					placeholder='Enter value'
// 					ref='myTestInput'
// 				/>
// 				<button className='test-button'
// 					onClick={this.alertInput}
// 					ref='alert_button'>
//                     Alert
// 				</button>
// 			</div>
//         );
//     }

    render: function() {
        var agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    onChange={this.onAuthorChange}
                    defaultValue=''
                    placeholder='Your name'
                    ref='author'
                />
                <textarea
                    className='add__text'
                    onChange={this.onTextChange}
                    defaultValue=''
                    placeholder='News text'
                    ref='text'
                ></textarea>
                <label className='add__checkrule'>
                    <input type='checkbox' /*defaultChecked={false}*/ ref='checkrule' onChange={this.onCheckRuleClick} />I agree with the rules
                </label>
                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>
                    Show news
                </button>
            </form>
        );
    }
});

var App = React.createClass({

    getInitialState: function() {
        return {
            news: my_news
        };
    },

    componentDidMount: function() {
        var self = this;
        window.ee.addListener('News.add', function(item) {
            var nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });
    },
    componentWillUnmount: function() {
        window.ee.removeListener('News.add');
    },

    render: function() {
        return (
            <div className='app'>
                <Add />
                <h3>World News</h3>
                <News myData={this.state.news} /> {/* add data */}
                {/* <Comments /> */}
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);