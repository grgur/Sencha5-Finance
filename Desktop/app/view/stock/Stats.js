Ext.define	('Finance.view.stock.Stats', {
	extend: 'Ext.Panel',
	xtype: 'stats',

	requires: [
		'Finance.view.stock.StatsModel',
		'Finance.view.stock.StatsController'
	],

	viewModel  : 'stats',
	controller : 'stats',

	bind: {
		data: '{stats}'
	},

	tpl : [
		'<b>symbol </b>               : {symbol}',
		'Market Cap</b>               : {MarketCap.content:currency}',
		'Enterprise Value</b>         : {EnterpriseValue.content:currency}',
		'Trailing PE</b>              : {TrailingPE.content:number}',
		'Forward PE </b>              : {ForwardPE.content:number}',
		'PEG Ratio  </b>              : {PEGRatio.content:number}',
		'Price Sales </b>             : {PriceSales.content:currency}M',
		'Price Book </b>              : {PriceBook.content:currency}',
		'Enterprise Value Revenue</b> : {EnterpriseValueRevenue.content:currency}M',
		'Enterprise Value EBITDA </b> : {EnterpriseValueEBITDA.content:currency}M',
		'Fiscal Year Ends </b>        : {FiscalYearEnds.content}',
		'Profit Margin    </b>        : {ProfitMargin.content} %',
		'Operating Margin </b>        : {OperatingMargin.content} %',
		'Return on Assets </b>        : {ReturnonAssets.content} %',
		'Return on Equity </b>        : {ReturnonEquity.content} %',
		'Revenue </b>                 : {Revenue.content:currency}',
		
		'Revenue Per Share  </b>      : {RevenuePerShare.content:currency}',
		'Qtrly Revenue Growth </b>    : {QtrlyRevenueGrowth.content}',
		'Gross Profit </b>            : {GrossProfit.content:currency}',
		'EBITDA </b>                  : {EBITDA.content:currency}',
		'Net Income Avl to Common</b> : {NetIncomeAvltoCommon.content:currency}',
		'Diluted EPS</b>              : {DilutedEPS.content}',
		'Qtrly Earnings Growth</b>    : {QtrlyEarningsGrowth.content}',
		'Total Cash </b>              : {TotalCash.content:currency}',
		'Total Cash Per Share </b>    : {TotalCashPerShare.content:currency}',
		'Total Debt </b>              : {TotalDebt.content:currency}',
		'Total Debt Equity </b>       : {TotalDebtEquity.content:currency}',
		'Current Ratio  </b>          : {CurrentRatio.content:currency}',
		'Book Value Per Share </b>    : {BookValuePerShare.content:currency}',
		'Operating Cash Flow </b>     : {OperatingCashFlow.content:currency}',
		'Levered Free Cash Flow</b>   : {LeveredFreeCashFlow.content:currency}',

		'Week Change</b>              : {p_52_WeekChange}',
		'Week High </b>               : {p_52_WeekHigh.content}',
		'Week Low </b>                : {p_52_WeekLow.content}'
	].join('<br><b>')
});

//https://developer.yahoo.com/yql/console/?q=select%20*%20from%20local.search%20where%20zip%3D%2794085%27%20and%20query%3D%27pizza%27&env=store://datatables.org/alltableswithkeys#h=SELECT+*+FROM+yahoo.finance.keystats+WHERE+symbol%3D'T'