function getProviderOrSigner(library, account) {
  return account ? library.getSigner(account).connectUnchecked() : library;
}

export default getProviderOrSigner;
