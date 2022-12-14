import { Empty } from 'antd';
import classnames from 'classnames';
import { ConvertUsd } from 'components';
import { calcWalletsData } from 'helpers';
import {
	useAllChildCurrenciesFetch,
	useDocumentTitle,
	useMarketsFetch,
	useMarketsTickersFetch,
	useRangerConnectFetch,
	useWalletsFetch,
} from 'hooks';
import _toNumber from 'lodash/toNumber';
import millify from 'millify';
import { SearchIcon } from 'mobile/assets/icons';
import { EstimatedValue } from 'mobile/components/EstimatedValue';
import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'components/Link';
import { selectAllChildCurrencies, selectWallets } from '../../../modules';
import { Decimal } from '../../components';
import { DEFAULT_CURRENCY_PRECISION } from '../../../constants';
import classNames from 'classnames';

export const NewWalletsMobileScreen = () => {
	const intl = useIntl();

	useDocumentTitle(intl.formatMessage({ id: 'page.mobile.wallets.title' }));
	useWalletsFetch();
	useAllChildCurrenciesFetch();
	useMarketsFetch();
	useMarketsTickersFetch();
	useRangerConnectFetch();
	const wallets = useSelector(selectWallets);
	const allChildCurrencies = useSelector(selectAllChildCurrencies);

	const [modeDisplay, setModeDisplay] = React.useState<'fiat' | 'coin'>('coin');
	const [searchString, setSearchString] = useState<string>('');
	const [hideSmallBalance, setHideSmallBalance] = useState<boolean>(false);

	const allChildCurrencyName = allChildCurrencies.map(_e => _e.id);

	const data = calcWalletsData(wallets, allChildCurrencies).filter(({ currency, total }) => {
		if (!currency.includes(searchString.toLowerCase().trim())) {
			return false;
		}

		if (hideSmallBalance && Number(total) <= 0) {
			return false;
		}

		return !allChildCurrencyName.includes(currency);
	});

	const renderWalletList = () => {
		return data
			.sort((prev, cur) => (cur.total && prev.total ? _toNumber(cur.total) - _toNumber(prev.total) : 0))
			.filter(item => item.type === modeDisplay)
			.map(_w => (
				<Link to={`/wallets/${_w.currency}/detail`} className="td-mobile-wallets__list__item" key={_w.currency}>
					<div className="td-mobile-wallets__list__item__top">
						<div className="td-mobile-wallets__list__item__top__icon">
							<img src={_w.iconUrl} alt={_w.name} />
						</div>
						<span className="td-mobile-wallets__list__item__top__text">{_w.currency.toUpperCase()}</span>
						<span className="td-mobile-wallets__list__item__top__number">
							<span>{convertAmount(_toNumber(_w.total) > 0 ? _toNumber(_w.total) : 0, _toNumber(_w.fixed))}</span>
						</span>
					</div>
					<div className="td-mobile-wallets__list__item__bottom">
						<span className="td-mobile-wallets__list__item__bottom__text">{_w.name}</span>
						<span className="td-mobile-wallets__list__item__bottom__number">
							<ConvertUsd value={Number(_w.total)} symbol={_w.currency} precision={4} defaultValue="0.00" /> $
						</span>
					</div>
				</Link>
			));
	};

	const convertAmount = (amount: number, fixed: number) => {
		const largeAmountString = (amount: string) => {
			const amountArray = amount.split('');
			const accurency = amountArray.pop();
			const amountString = amountArray.join('');
			return (
				<span>
					<span>{amountString}</span>
					<span className="ml-1" style={{ color: 'var(--yellow)' }}>
						{accurency}
					</span>
				</span>
			);
		};
		return Number(amount) >= 100000000 ? (
			largeAmountString(
				millify(Number(amount), {
					precision: fixed,
				}),
			)
		) : (
			<Decimal fixed={DEFAULT_CURRENCY_PRECISION}>{amount}</Decimal>
		);
	};

	const getModeClassNames = (type: typeof modeDisplay) => {
		return classNames('td-mobile-wallets__mode-crypto w-50 text-center mode-item', {
			'mode--active': modeDisplay === type,
		});
	};
	return (
		<div className="td-mobile-wallets">
			<EstimatedValue />
			<div className="td-mobile-wallets__header">
				<label className="td-mobile-wallets__header__search-box" htmlFor="td-mobile-wallets-search-box">
					<SearchIcon className="td-mobile-wallets__header__search-box__icon" />
					<DebounceInput
						id="td-mobile-wallets-search-box"
						className="td-mobile-wallets__header__search-box__input"
						debounceTimeout={500}
						onChange={e => setSearchString(e.target.value)}
					/>
				</label>

				<div className="td-mobile-wallets__header__toggle">
					<span className="td-mobile-wallets__header__toggle__text">
						{intl.formatMessage({ id: 'page.mobile.wallets.toggleText' })}
					</span>
					<label
						className={classnames('td-mobile-wallets__header__toggle__checkbox', {
							'td-mobile-wallets__header__toggle__checkbox--checked': hideSmallBalance,
						})}
						htmlFor="td-mobile-wallet-hide-small-balance"
					>
						<input
							id="td-mobile-wallet-hide-small-balance"
							className={classnames('td-mobile-wallets__header__toggle__checkbox__input', {
								'td-mobile-wallets__header__toggle__checkbox--checked__input': hideSmallBalance,
							})}
							type="checkbox"
							onChange={e => setHideSmallBalance(e.target.checked)}
						/>
						<div
							className={classnames('td-mobile-wallets__header__toggle__checkbox__dot', {
								'td-mobile-wallets__header__toggle__checkbox--checked__dot': hideSmallBalance,
							})}
						/>
					</label>
				</div>
			</div>
			<div className="td-mobile-wallets__mode d-flex">
				<div className={getModeClassNames('coin')} onClick={() => setModeDisplay('coin')}>
					Crypto
				</div>
				<div className={getModeClassNames('fiat')} onClick={() => setModeDisplay('fiat')}>
					Fiat
				</div>
			</div>
			<div className="td-mobile-wallets__list">{data.length === 0 ? <Empty /> : renderWalletList()}</div>
		</div>
	);
};
