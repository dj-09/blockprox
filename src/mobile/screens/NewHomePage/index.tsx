import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'components/Link';
import Slider, { Settings } from 'react-slick';
import { useDepthFetch, useEventsFetch, useMarketsFetch, useMarketsTickersFetch, useRangerConnectFetch } from '../../../hooks';
import { BottelIcon, CompetitionIcon, GiftIcon, PromotionICon /* TransactionIcon, VoteIcon */ } from './../../assets/icons';
import { NewAllMarketList } from './../../components';
import { Announcment } from './Announcment';
import { BoxImg } from './BoxImg';
import { MarketsTop } from './MarketTop';

const NewHomePage = () => {
	useMarketsFetch();
	useMarketsTickersFetch();
	useRangerConnectFetch();
	useDepthFetch();
	useEventsFetch();
	const intl = useIntl();

	const renderDirectionals = () => {
		const settings: Settings = {
			dots: true,
			infinite: false,
			arrows: false,
			autoplay: false,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1,
		};

		return (
			<React.Fragment>
				<Slider className="td-mobile-screen-home__direction__list-item" {...settings}>
					{/* <div>
						<Link to="/transactions" className="td-mobile-screen-home__direction__list-item__item">
							<TransactionIcon />
							<span>{intl.formatMessage({ id: 'page.mobile.home.direction.transactions' })}</span>
						</Link>
					</div> */}
					<div>
						<Link to="http://bitproex.online/" className="td-mobile-screen-home__direction__list-item__item">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_1_2)">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12 24C5.37225 24 0 18.6277 0 12C0 5.37225 5.37225 0 12 0C18.6277 0 24 5.37225 24 12C24 18.6277 18.6277 24 12 24ZM13.4415 10.3448V8.57025H17.502V5.86425H6.44625V8.57025H10.5067V10.344C7.20675 10.4955 4.725 11.1495 4.725 11.9325C4.725 12.7155 7.20675 13.3687 10.5067 13.521V19.2075H13.4415V13.5195C16.7363 13.368 19.212 12.7147 19.212 11.9325C19.212 11.1502 16.7363 10.497 13.4415 10.3448ZM13.4415 13.0372V13.0358C13.359 13.0418 12.9337 13.0673 11.985 13.0673C11.2275 13.0673 10.6942 13.0448 10.5067 13.0358V13.038C7.59075 12.9098 5.41425 12.402 5.41425 11.7945C5.41425 11.1877 7.59075 10.68 10.5067 10.5495V12.5325C10.6972 12.546 11.2432 12.5782 11.9977 12.5782C12.903 12.5782 13.3568 12.5408 13.4415 12.5333V10.551C16.3515 10.6807 18.5228 11.1885 18.5228 11.7945C18.5228 12.402 16.3515 12.9082 13.4415 13.0372V13.0372Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_1_2">
										<rect width="25" height="28" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<span>Buy USDT</span>
						</Link>
					</div>

					<div>
						<Link to="/ieo" className="td-mobile-screen-home__direction__list-item__item">
							<BottelIcon />
							<span>{intl.formatMessage({ id: 'page.mobile.home.direction.ieo' })}</span>
						</Link>
					</div>

					<div>
						<Link to="/airdrops" className="td-mobile-screen-home__direction__list-item__item">
							<GiftIcon />
							<span>{intl.formatMessage({ id: 'page.mobile.home.direction.airdrops' })}</span>
						</Link>
					</div>

					<div>
						<Link to="/competition" className="td-mobile-screen-home__direction__list-item__item">
							<CompetitionIcon />

							<span>{intl.formatMessage({ id: 'page.mobile.home.direction.competition' })}</span>
						</Link>
					</div>

					{/* <div>
						<Link to="/vote" className="td-mobile-screen-home__direction__list-item__item">
							<VoteIcon />
							<span>{intl.formatMessage({ id: 'page.mobile.home.direction.vote' })}</span>
						</Link>
					</div> */}

					<div>
						<Link to="/promotion" className="td-mobile-screen-home__direction__list-item__item">
							<PromotionICon />
							<span>{intl.formatMessage({ id: 'page.mobile.home.direction.promotion' })}</span>
						</Link>
					</div>
				</Slider>
			</React.Fragment>
		);
	};

	return (
		<div className="td-mobile-screen-home">
			<div className="td-mobile-screen-home__box-img">
				<BoxImg />
			</div>
			<Announcment />

			<MarketsTop />

			<div className="td-mobile-screen-home__direction">{renderDirectionals()}</div>

			<div className="td-mobile-screen-home__market-main">
				<NewAllMarketList hideFavorite={true} />
			</div>
		</div>
	);
};

export const HomePageScreenMobile = React.memo(NewHomePage);
