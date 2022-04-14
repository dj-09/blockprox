import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BankAccountList } from 'plugins/Bank/containers';
import { NewCustomInput, NewModal } from 'components';
import NoticeWhiteIcon from 'assets/icons/notice_white.svg';
import { useDispatch, useSelector } from 'react-redux';
import { bankAccountListFetch, createBankAccount } from 'modules/plugins/fiat/bank/actions/bankAccountActions';
import {
	selectBankAccountList,
	selectBankAccountListLoading,
	selectCreateBankAccountLoading,
	selectDeleteBankAccountLoading,
} from 'modules/plugins/fiat/bank/selectors';
import { selectUserInfo } from 'modules';
import { useHistory } from 'react-router';
import { LoadingGif } from 'components/LoadingGif';
import classNames from 'classnames';

interface BankFormField {
	accountName: string;
	bankName: string;
	bankAddress: string;
	bankAccountNumber: string;
	iFSCCode: string;
	otpCode: string;
}

export const BankAccountListScreen = () => {
	const history = useHistory();

	// store
	const bankAccountList = useSelector(selectBankAccountList);
	const isBankAccountListLoading = useSelector(selectBankAccountListLoading);
	const user = useSelector(selectUserInfo);
	const isCreatingBankAccount = useSelector(selectCreateBankAccountLoading);
	const isDeletingBankAccount = useSelector(selectDeleteBankAccountLoading);

	// dispatch
	const dispatch = useDispatch();
	const dispatchFetchBankAccountList = () => dispatch(bankAccountListFetch());

	const redirectToEnable2fa = () => history.push('/security/2fa', { enable2fa: true });

	React.useEffect(() => {
		dispatchFetchBankAccountList();
	}, []);

	const [showAddBankAccountForm, setShowAddBankAccountForm] = useState(false);

	const handleCloseAddBankAccountForm = () => {
		setShowAddBankAccountForm(false);
	};
	const handleShowAddBankAccountForm = () => {
		setShowAddBankAccountForm(true);
	};

	const [bankForm, setBankForm] = React.useState<BankFormField>({
		accountName: '',
		bankName: '',
		bankAddress: '',
		bankAccountNumber: '',
		iFSCCode: '',
		otpCode: '',
	});

	const resetForm = () => {
		setBankForm({
			accountName: '',
			bankName: '',
			bankAddress: '',
			bankAccountNumber: '',
			iFSCCode: '',
			otpCode: '',
		});
	};
	const handleFieldBankForm = (field: string, value: string) => {
		setBankForm(prev => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCreateBankAccount = () => {
		dispatch(
			createBankAccount({
				account_name: bankForm.accountName,
				account_number: bankForm.bankAccountNumber,
				bank_address: bankForm.bankAddress,
				bank_name: bankForm.bankName,
				ifsc_code: bankForm.iFSCCode,
				otp: bankForm.otpCode,
			}),
		);
		handleCloseAddBankAccountForm();
		resetForm();
	};

	const isValidForm = () => {
		const { accountName, bankName, iFSCCode, bankAddress, bankAccountNumber, otpCode } = bankForm;
		const isValid2FA = otpCode.match('^[0-9]{6}$');

		return accountName && bankName && iFSCCode && bankAddress && bankAccountNumber && isValid2FA;
	};

	const renderBodyModalAddBankForm = () => {
		return (
			<form className="desktop-bank-account-list-screen__bank-form">
				<div className="desktop-bank-account-list-screen__bank-form__input">
					<label>Name of Account</label>
					<div style={{ marginBottom: 3 }}>
						<NewCustomInput
							type="text"
							label="Name of Account"
							placeholder="Enter your account"
							defaultLabel="Name of Account"
							handleFocusInput={() => {}}
							handleChangeInput={value => {
								handleFieldBankForm('accountName', value);
							}}
							inputValue={bankForm.accountName}
							classNameLabel="d-none"
							classNameInput="td-email-form__input"
							autoFocus={true}
						/>
					</div>
					<span className="desktop-bank-account-list-screen__bank-form__input__warning">
						<img
							src={NoticeWhiteIcon}
							className="desktop-bank-account-list-screen__bank-form__input__warning__icon"
						/>
						Recipient name must be the same as recorded on our platform. Please contact{' '}
						{
							<a
								className="desktop-bank-account-list-screen__bank-form__input__warning__highlight"
								href="mailto:support@blockproex.in"
							>
								administrator support
							</a>
						}{' '}
						for any issues.
					</span>
				</div>

				<div className="desktop-bank-account-list-screen__bank-form__input">
					<label>Bank Name</label>
					<div>
						<NewCustomInput
							type="text"
							label="Bank Name"
							placeholder="Enter your bank's name"
							defaultLabel="Bank Name"
							handleFocusInput={() => {}}
							handleChangeInput={value => {
								handleFieldBankForm('bankName', value);
							}}
							inputValue={bankForm.bankName}
							classNameLabel="d-none"
							classNameInput="td-email-form__input"
						/>
					</div>
				</div>
				<div className="desktop-bank-account-list-screen__bank-form__input">
					<label>Bank Address</label>
					<div>
						<NewCustomInput
							type="text"
							label="Bank Address"
							placeholder="Enter your bank's address"
							defaultLabel="Bank Address"
							handleFocusInput={() => {}}
							handleChangeInput={value => {
								handleFieldBankForm('bankAddress', value);
							}}
							inputValue={bankForm.bankAddress}
							classNameLabel="d-none"
							classNameInput="td-email-form__input"
						/>
					</div>
				</div>
				<div className="desktop-bank-account-list-screen__bank-form__input">
					<label>Bank Account Number</label>
					<div>
						<NewCustomInput
							type="text"
							label="Bank Account Number"
							placeholder="Enter your bank account's number"
							defaultLabel="Bank Account Number"
							handleFocusInput={() => {}}
							handleChangeInput={value => {
								handleFieldBankForm('bankAccountNumber', value);
							}}
							inputValue={bankForm.bankAccountNumber}
							classNameLabel="d-none"
							classNameInput="td-email-form__input"
						/>
					</div>
				</div>
				<div className="desktop-bank-account-list-screen__bank-form__input">
					<label>IFSC Code</label>
					<div>
						<NewCustomInput
							type="text"
							label="IFSC Code"
							placeholder="Enter IFSC code"
							defaultLabel="IFSC Code"
							handleFocusInput={() => {}}
							handleChangeInput={value => {
								handleFieldBankForm('iFSCCode', value);
							}}
							inputValue={bankForm.iFSCCode}
							classNameLabel="d-none"
							classNameInput="td-email-form__input"
						/>
					</div>
				</div>
				<div className="desktop-bank-account-list-screen__bank-form__input">
					<label>OTP Code</label>
					<div>
						<NewCustomInput
							type="text"
							label="OTP Code"
							placeholder=""
							defaultLabel="OTP Code"
							handleFocusInput={() => {}}
							handleChangeInput={value => {
								if ((!Number(value) && value.length > 0) || value.length >= 7) {
									return;
								}

								handleFieldBankForm('otpCode', value);
							}}
							inputValue={bankForm.otpCode}
							classNameLabel="d-none"
							classNameInput="td-email-form__input"
						/>
					</div>
				</div>

				<div className="d-flex justify-content-center mt-4">
					<Button
						disabled={!isValidForm()}
						block={true}
						style={{
							background: '#FFB800',
							border: '1px solid #848E9C',
							borderRadius: '50px',
							color: '#000',
							fontWeight: 600,
							fontSize: 14,
						}}
						className="w-50"
						size="lg"
						variant="primary"
						onClick={() => handleCreateBankAccount()}
					>
						Confirm
					</Button>
				</div>
			</form>
		);
	};

	const render2FARequire = () => {
		return (
			<div className="d-flex flex-column justify-content-center align-items-center mt-5">
				<h3 className="mb-3">To use bank feature, you have to enable 2FA </h3>
				<Button
					style={{
						background: 'var(--system-yellow)',
						border: '1px solid #848E9C',
						borderRadius: '23.5px',
					}}
					block={true}
					onClick={redirectToEnable2fa}
					size="lg"
					className="w-50"
					variant="primary"
				>
					Enable 2FA
				</Button>
			</div>
		);
	};
	const overLayClassName = 'desktop-bank-account-list-screen__overlay';

	return (
		<div className="desktop-bank-account-list-screen">
			<div
				className={classNames(
					overLayClassName,
					{
						[`${overLayClassName}--display`]: isCreatingBankAccount || isDeletingBankAccount,
					},
					{
						[`${overLayClassName}--not-display`]: !isCreatingBankAccount && !isDeletingBankAccount,
					},
				)}
			>
				<div className={`${overLayClassName}__loading`}>
					<LoadingGif />
				</div>
			</div>
			{!user.otp ? (
				render2FARequire()
			) : (
				<React.Fragment>
					<div className="desktop-bank-account-list-screen__header">
						<h1 className="desktop-bank-account-list-screen__header__title">Bank Account</h1>
						<Button
							className="desktop-bank-account-list-screen__header__add-bank-btn"
							onClick={handleShowAddBankAccountForm}
						>
							Add Bank Account
						</Button>
					</div>
					<BankAccountList bankAccounts={bankAccountList} isLoading={isBankAccountListLoading} />

					<NewModal
						className="desktop-bank-account-list-screen__new-modal"
						show={showAddBankAccountForm}
						onHide={handleCloseAddBankAccountForm}
						titleModal="BANK INFORMATION"
						bodyModal={renderBodyModalAddBankForm()}
					/>
				</React.Fragment>
			)}
		</div>
	);
};
